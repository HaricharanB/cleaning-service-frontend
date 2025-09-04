import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent  {

updateUsernameForm: FormGroup;
  updatePasswordForm: FormGroup;
  otpSentForUsername = false;
  otpSentForPassword = false;
  errorMessageUsername = '';
  errorMessagePassword = '';

  constructor(private fb: FormBuilder, private adminService: AdminService, private authService: AuthService, private router: Router) {
    this.updateUsernameForm = this.fb.group({
       username: ['', Validators.required],
      newUsername: ['', Validators.required],
      otp: ['']
    });
    this.updatePasswordForm = this.fb.group({
      username: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      otp: ['']
    });
  }

  requestOtpForUsername(): void {
    if (this.updateUsernameForm.get('newUsername')?.valid) {
       const username = this.updateUsernameForm.get('username')?.value;
      this.adminService.requestAdminOtp(username).subscribe(
        () => {
          this.otpSentForUsername = true;
          this.errorMessageUsername = '';
        },
        (error) => {
          this.errorMessageUsername = 'Failed to send OTP.';
        }
      );
    }
  }
  
  updateUsername(): void {
    if (this.updateUsernameForm.valid) {
      const { username,newUsername, otp } = this.updateUsernameForm.value;
      const payload = {
        username: username,
        newUsername: newUsername,
        otp: otp
      };
      console.log(payload);
      this.adminService.updateUsername(payload).subscribe(
        () => {
          alert('Username updated successfully! Pplease login again.');
          this.authService.logout(); // Log out the user
          this.router.navigate(['/admin/login']); // Redirect to login page
          this.updateUsernameForm.reset();
          this.otpSentForUsername = false;
        },
        (error) => {
          this.errorMessageUsername = 'Invalid OTP or username.';
        }
      );
    }
  }

  requestOtpForPassword(): void {
    if (this.updatePasswordForm.get('oldPassword')?.valid && this.updatePasswordForm.get('newPassword')?.valid) {
      const username = this.updatePasswordForm.get('username')?.value;
      console.log(username);
      this.adminService.requestAdminOtp(username).subscribe(
        () => {
          this.otpSentForPassword = true;
          this.errorMessagePassword = '';
        },
        (error) => {
          this.errorMessagePassword = 'Failed to send OTP.';
        }
      );
    }
  }

  updatePassword(): void {
    if (this.updatePasswordForm.valid) {
      const {username, oldPassword, newPassword, otp } = this.updatePasswordForm.value;
      const payload = {
        username: username,
        oldPassword: oldPassword,
        newPassword: newPassword,
        otp: otp
      };
      this.adminService.updatePassword(payload).subscribe(
        () => {
          alert('Password updated successfully! Please login again.');
          this.authService.logout(); // Log out the user
          this.router.navigate(['/admin/login']); // Redirect to login page
          this.updatePasswordForm.reset();
          this.otpSentForPassword = false;
        },
        (error) => {
          this.errorMessagePassword = 'Invalid OTP or password.';
        }
      );
    }
  }
}





  