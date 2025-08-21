// in src/app/admin/admin-login/admin-login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject the AuthService
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['owner', Validators.required],
      password: ['password', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.router.navigate(['/admin']);
        },
        (error) => {
          this.errorMessage = 'Invalid username or password.';
        }
      );
    }
  }
}