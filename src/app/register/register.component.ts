import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadService } from '../services/lead.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private leadService: LeadService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const leadData = { ...this.registerForm.value };

      this.leadService.captureLead(leadData).subscribe(
        response => {
          console.log('Lead captured successfully:', response);
          alert('Thank you! Please check your email to verify and enable "Add to Cart" functionality.');
          this.registerForm.reset;
          // this.router.navigate(['/services']); // Redirect to services page after submission
        },
        error => {
          console.error('Error capturing lead:', error);
          alert('There was an error. Please try again.');
        }
      );
    }
  }
}