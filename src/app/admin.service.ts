import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface CleaningService {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  advanceAmount: number;
  categoryId: number;
}
export interface CleaningServiceView {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  advanceAmount: number;
  category: {
    id: number;
    name: string; 
    maxOrdersPerDay: number;
  };
}
@Injectable({
  providedIn: 'root'
})

export class AdminService {
  // Method to get all services
  getAllServices(): Observable<CleaningServiceView[]> {
    return this.http.get<CleaningServiceView[]>(`${this.apiUrl}/services`);
  }

  // Method to add a new service
  addService(service: CleaningService): Observable<any> {
    return this.http.post(`${this.apiUrl}/services`, service);
  }

  // Method to update an existing service
  updateService(service: CleaningService): Observable<any> {
    return this.http.put(`${this.apiUrl}/services/${service.id}`, service);
  }

  // Method to delete a service
  deleteService(serviceId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/services/${serviceId}`);
  }
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

   getAllLeads(): Observable<any> {
    // The AuthInterceptor will automatically add the Authorization header
    return this.http.get(`${this.apiUrl}/leads`);
  }
}