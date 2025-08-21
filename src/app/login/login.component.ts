// in src/app/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeadService } from '../services/lead.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isOtpSent = false;
  message = "";
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['']
    });
  }

  ngOnInit(): void { }

  canSubmit(): boolean {
    return this.isOtpSent 
           ? this.loginForm.get('otp')?.valid || false
           : this.loginForm.get('email')?.valid || false;
  }

  onSubmit(): void {
    if (this.isOtpSent) {
      this.verifyOtp();
    } else {
      this.requestOtp();
    }
  }

  requestOtp(): void {
    const email = this.loginForm.get('email')?.value;
    this.leadService.requestOtp(email).subscribe(
      () => {
        this.isOtpSent = true;
        this.message = "OTP sent to your email. It is valid for 5 minutes.";
        this.isSuccess = true;
      },
      (error) => {
        this.message = error.error;
        this.isSuccess = false;
      }
    );
  }

verifyOtp(): void {
  const email = this.loginForm.get('email')?.value;
  const otp = this.loginForm.get('otp')?.value;

  if (this.loginForm.get('otp')?.valid) {
    const payload = { email, otp }; // Send as JSON

    this.leadService.verifyOtp(payload).subscribe(
      (response: any) => {
        // Backend should send: { jwt: "eyJhbGciOiJI...", leadId: "123" }
        const token = response?.token?.trim(); // ensure no spaces/newlines
        const leadId = response?.leadId;

        if (token && leadId) {
          this.authService.loginWithToken(token);
          localStorage.setItem('jwt_token', token);
          localStorage.setItem('leadId', leadId);

          console.log("JWT stored:", token);
          console.log("Lead ID stored:", leadId);

          this.message = "Login successful!";
          this.isSuccess = true;
          this.router.navigate(['/category']);
        } else {
          this.message = "Invalid server response.";
          this.isSuccess = false;
        }
      },
      (error) => {
        console.error("OTP verification error:", error);
        this.message = "Invalid or expired OTP.";
        this.isSuccess = false;
      }
    );
  } else {
    this.message = "Please enter the OTP.";
    this.isSuccess = false;
  }
}


}