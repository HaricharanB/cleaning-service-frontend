// in src/app/admin/admin-login/admin-login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { AdminService } from 'src/app/admin.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  loginStep: 'credentials' | 'otp' = 'credentials';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      otp: ['']
    });
  }

  onSubmit(): void {
    if (this.loginStep === 'credentials') {
      this.loginWithCredentials();
    } else if (this.loginStep === 'otp') {
      this.verifyOtp();
    }
  }

  loginWithCredentials(): void {
    if (this.loginForm.get('username')?.valid && this.loginForm.get('password')?.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.adminService.requestAdminOtp(this.loginForm.get('username')?.value).subscribe(
            () => {
              this.loginStep = 'otp';
            },
            (error) => {
              this.errorMessage = error.error;
            }
          );
        },
        (error) => {
          this.errorMessage = 'Invalid username or password.';
        }
      );
    }
  }

  verifyOtp(): void {
    if (this.loginForm.get('otp')?.valid) {
      const { username, password, otp } = this.loginForm.value;
      this.adminService.verifyAdminOtp(username, password, otp).subscribe(
        () => {
          this.router.navigate(['/admin']);
        },
        (error) => {
          this.errorMessage = 'Invalid or expired OTP.';
        }
      );
    }
  }
}