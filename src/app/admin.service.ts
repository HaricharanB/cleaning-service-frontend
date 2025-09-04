import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
   // CRUD for Categories
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category`);
  }
  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/category`, category);
  }
  updateCategory(category: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/category/${category.id}`, category);
  }
  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/category/${categoryId}`);
  }
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
  private authUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

   getAllLeads(): Observable<any> {
    // The AuthInterceptor will automatically add the Authorization header
    return this.http.get(`${this.apiUrl}/leads`);
  }
  requestAdminOtp(username: string): Observable<any> {
    return this.http.post(`${this.authUrl}/request-otp-admin`, { username }, { responseType: 'text' });
  }

  // Corrected method for the third step: verifying the OTP
  verifyAdminOtp(username: string, password: string, otp: string): Observable<any> {
    const payload = { username: username, password: password, otp: otp };
    return this.http.post(`${this.authUrl}/verify-otp-admin`, payload, { responseType: 'text' }).pipe(
          tap((response: string) => {
          localStorage.setItem('jwt_token', response);
           
          })
        );
  }
    updateUsername(payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-username`, payload);
  }
  
  updatePassword(payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-password`, payload);
  }


}



