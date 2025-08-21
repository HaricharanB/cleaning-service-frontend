import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead.service';
import { CartService } from '../services/cart.service';
import { CleaningService } from '../services/service.service';
import { AuthService } from '../auth.service';
  import {jwtDecode }from 'jwt-decode'; 
  import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  leadId: number | null = null;
  leadDetails: any = null;
  cartItems: CleaningService[] = [];
  cartTotal: number = 0;

  constructor(
    private leadService: LeadService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }
// npm install jwt-decode

checkLeadIdMatch(): void {
  const token = localStorage.getItem('jwt_token');
  const storedLeadId = localStorage.getItem('leadId');

  if (token && storedLeadId) {
    try {
      const decoded: any = jwtDecode(token);
      const tokenLeadId = decoded?.leadId?.toString();

      if (tokenLeadId !== storedLeadId) {
        console.warn("Lead ID tampered!");
        this.logout();
      }
    } catch (err) {
      console.error("Invalid token:", err);
      this.logout();
    }
  } else {
    this.logout();
  }
}

logout(): void {
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('leadId');
  // optionally route to login
  this.router.navigate(['/login']);
}

  ngOnInit(): void {
    this.checkLeadIdMatch();
    this.leadId = this.authService.getLeadId();
    console.log(this.leadId);
    
    if (this.leadId) {
      // For now, let's display the items from the CartService
      this.cartService.getCart().subscribe(items => {
        this.cartItems = items;
        this.cartTotal = this.cartService.getCartTotal();
      });

      // We'll update the backend later
      // this.leadService.getLeadDetails(this.leadId).subscribe(data => {
      //   this.leadDetails = data;
      //   // We'll parse cartDetails here later
      // });
    }
  }

  // Method to finalize the booking (we'll implement this fully later)
    onFinalizeBooking(): void {
        if (this.leadId && this.cartItems.length > 0) {
            // First, we need to transform the data to match the backend's CartItem format
            const cartItemsForBackend = this.cartItems.map(item => ({
                serviceName: item.name,
                price: item.price,
                advanceAmount: item.advanceAmount
            }));

            // Then, send this transformed array to the backend
            this.leadService.updateCartDetails(this.leadId, cartItemsForBackend).subscribe(
                response => {
                    console.log('Booking finalized:', response);
                    alert('Booking Confirmed! Thank you for your order. We will reach out shortly.');
                    // Here you can also clear the cart or navigate to a thank you page
                },
                error => {
                    console.error('Error finalizing booking:', error);
                    alert('There was an error finalizing your booking. Please try again.');
                }
            );
        } else {
            alert('Your cart is empty or a lead ID is missing.');
        }
    }
}