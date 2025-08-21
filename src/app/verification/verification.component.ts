import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from '../services/lead.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  verificationStatus: 'verifying' | 'success' | 'error' = 'verifying';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leadService: LeadService,
    private authService: AuthService
  ) { }
ngOnInit(): void {
  const token = this.route.snapshot.queryParams['token'];
  console.log("Received token:", token);
  if (token) {
    this.leadService.verifyLead(token).subscribe(
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
        }

        console.log("Lead ID from token:", this.authService.getLeadId());
        this.verificationStatus = 'success';

        setTimeout(() => {
          this.router.navigate(['/cart']);
        }, 3000);
      },
      error => {
        this.verificationStatus = 'error';
      }
    );
  } else {
    this.verificationStatus = 'error';
  }
}


}