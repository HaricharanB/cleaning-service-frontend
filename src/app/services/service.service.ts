import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the structure of a Service object for type safety
export interface CleaningService {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  advanceAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
   getServicesByCategory(category: string): Observable<CleaningService[]> {
    return this.http.get<CleaningService[]>(`${this.apiUrl}?category=${category}`);
  }
  private apiUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) { }

  getServices(): Observable<CleaningService[]> {
    return this.http.get<CleaningService[]>(this.apiUrl);
  }


  
}
