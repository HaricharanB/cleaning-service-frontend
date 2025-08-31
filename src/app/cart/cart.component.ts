import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead.service';
import { CartService } from '../services/cart.service';
import { CleaningService } from '../services/service.service';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';
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
  dateErrors: Map<number, string> = new Map();

  cartTotal: number = 0;
  // minDate: string = new Date().toISOString().split('T')[0];
  minDate: Date = new Date();
  errorMessage: string | null = null;

  // Map categoryId -> booked Dates array (Date[])
  bookedDatesMap: Map<number, Date[]> = new Map();

  // Map serviceId -> selected bookingDate string (yyyy-MM-dd)
  selectedDates: Map<number, string> = new Map();
  isselected: boolean = false;
  constructor(
    private leadService: LeadService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}
  checkavailable(): void {
    this.isselected = !this.isselected;
  }
  checkLeadIdMatch(): void {
    const token = localStorage.getItem('jwt_token');
    const storedLeadId = localStorage.getItem('leadId');

    if (token && storedLeadId) {
      try {
        const decoded: any = jwtDecode(token);
        const tokenLeadId = decoded?.leadId?.toString();

        if (tokenLeadId !== storedLeadId) {
          console.warn('Lead ID tampered!');
          this.logout();
        }
      } catch (err) {
        console.error('Invalid token:', err);
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('leadId');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.checkLeadIdMatch();
    this.leadId = this.authService.getLeadId();

    if (this.leadId) {
      this.cartService.getCart().subscribe((items) => {
        this.cartItems = items;
      this.cartItems.forEach(item => {
        this.cartService.getBookedDates(item.category.id).subscribe(dates => {
           const bookedDateStrings = this.datesToStrings(dates);
          item.bookedDates = bookedDateStrings;  // assign string[] of 'YYYY-MM-DD'
           console.log('Normalized booked dates for item:', item.id, bookedDateStrings);
        });
      });
      this.cartTotal = this.cartService.getCartTotal();
    });
  }
}
  
datesToStrings(dates: any[]): string[] {
  return dates.map(date => {
    if (Array.isArray(date) && date.length === 3) {
      // date is like [year, month, day] with month likely 1-based
      const [year, month, day] = date;
      // Format month and day with leading zero
      const mm = String(month).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      return `${year}-${mm}-${dd}`;
    } else if (date instanceof Date) {
      // Date object
      return date.toISOString().split('T')[0];
    } else if (typeof date === 'string') {
      // Already a string; normalize by slicing if needed
      return date.slice(0, 10);
    } else {
      console.warn('Unknown date format', date);
      return '';
    }
  }).filter(s => s.length === 10);  // filter out invalid conversions
}


toDate(dateStr: string | null): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  return new Date(+parts[0], +parts[1] - 1, +parts[2]);
}

onDateSelected(itemId: number, event: Event) {
  const input = event.target as HTMLInputElement;
  this.selectedDates.set(itemId, input.value);
}


  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
isDateBookeds(selectedDate: string, bookedDates: string[]): boolean {
  return bookedDates.includes(selectedDate);
}


  onFinalizeBooking(): void {
    
    if (this.leadId && this.cartItems.length > 0) {
      // Check for date errors before constructing payload
for (const item of this.cartItems) {
  const selectedDateStr = this.selectedDates.get(item.id) ?? '';
  console.log('Selected date for item', item.id, selectedDateStr);
  console.log('Booked dates for item', item.id, item.bookedDates);
  if (this.isDateBookeds(this.selectedDates.get(item.id) ?? '', item.bookedDates ?? [])) {
    alert(`Item ${item.id} with category "${item.category.name}" is already booked at maximum for the date you have selected.`);
    this.selectedDates.set(item.id, ''); // Clear the invalid selection
    return; // This return now exits the entire function
  }
}
      const dtoPayload = this.cartItems.map((item) => ({
        serviceId: item.id,
        bookingDate: this.selectedDates.get(item.id)
          ? this.formatDate(this.toDate(this.selectedDates.get(item.id) ?? null)!)
          : null
      }));

      console.log('DTO Payload:', dtoPayload);
      // Ensure all bookingDates selected
      const invalid = dtoPayload.some((dto) => !dto.bookingDate);
      if (invalid) {
        alert('Please select booking dates for all services.');
        return;
      }

      this.leadService.updateCartDetails(this.leadId, dtoPayload).subscribe(
        (response) => {
          alert('Booking Confirmed! Thank you for your order.');
          // You may clear cart or navigate
        },
        (error) => {
          console.error(error);
          alert('There was an error finalizing your booking. Please try again.');
        }
      );
    } else {
      alert('Your cart is empty or a lead ID is missing.');
    }
  }
}
