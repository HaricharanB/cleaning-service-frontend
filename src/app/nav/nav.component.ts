import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isVerified = false;
  isLoggedIn = false;

  constructor(
    private router: Router,
 private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Check local storage on init to see if the user is verified
// this.isVerified = !!(localStorage.getItem('jwt_token') && localStorage.getItem('leadId'));


    // Subscribe to the authentication state to get real-time updates
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  

 
}
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  }


  // Remove the unused standalone logout function, as the logout logic is already implemented as a method in the NavComponent class.

