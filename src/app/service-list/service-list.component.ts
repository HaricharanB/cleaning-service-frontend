import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService, CleaningService } from '../services/service.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services: any[] = [];
  isVerified = false;
  currentCategory: string | null = null;

  constructor(
    private serviceService: ServiceService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
      private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // Check local storage for authentication status
 this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isVerified = isAuthenticated;  
      console.log('Is Verified:', this.isVerified);
    });
    // Subscribe to query parameter changes to react to category selection
    this.route.queryParams.subscribe(params => {
      this.currentCategory = params['category'] || null;
      this.loadServices();
    });
  }
  
  loadServices(): void {
    if (this.currentCategory) {
      this.serviceService.getServicesByCategory(this.currentCategory).subscribe(data => {
        this.services = this.processDescriptions(data);
      });
    } else {
      this.serviceService.getServices().subscribe(data => {
        this.services = this.processDescriptions(data);
      });
    }
  }

  // Method for processing descriptions into main text and bullet points
  processDescriptions(services: CleaningService[]): any[] {
    return services.map(service => {
      const parts = service.description.split('*');
      return {
        ...service,
        mainDescription: parts[0].trim(),
        bulletPoints: parts.slice(1).map(point => point.trim()).filter(point => point.length > 0)
      };
    });
  }

  // Method for adding to cart for verified users
  addToCart(service: any): void {
    this.cartService.addToCart(service);
    alert(`${service.name} added to your cart!`);
  }
  removeFromCart(service: any): void {
    this.cartService.removeFromCart(service);
    alert(`${service.name} removed from your cart!`);
  }
}