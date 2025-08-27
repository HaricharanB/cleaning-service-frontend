import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CleaningService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CleaningService[] = [];
  private cartSubject: BehaviorSubject<CleaningService[]> = new BehaviorSubject(this.cartItems);

  constructor() { }

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
}