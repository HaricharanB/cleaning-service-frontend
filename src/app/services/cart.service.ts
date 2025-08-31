import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CleaningService } from './service.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
getBookedDates(categoryId: number): Observable<string[]> {
  return this.http.get<string[]>(`http://localhost:8080/api/bookings/booked-dates?categoryId=${categoryId}`);
}
  private cartItems: CleaningService[] = [];
  private cartSubject: BehaviorSubject<CleaningService[]> = new BehaviorSubject(this.cartItems);

  constructor(private http: HttpClient) { 
    
  }

  getCart(): Observable<CleaningService[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(service: CleaningService): void {
    this.cartItems.push(service);
    this.cartSubject.next(this.cartItems);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, service) => total + service.price, 0);
  }
  removeFromCart(service: CleaningService): void {
    const index = this.cartItems.findIndex(item => item.id === service.id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.cartSubject.next(this.cartItems);
    }
  }
  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }
}