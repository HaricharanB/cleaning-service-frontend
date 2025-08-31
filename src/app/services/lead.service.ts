import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// export interface CleaningServices{
//     service: {
//         id: number;
//     };
// }
@Injectable({
  providedIn: 'root'
})

export class LeadService {


  private apiUrl = 'http://localhost:8080/api/leads';

  constructor(private http: HttpClient) { }

  captureLead(leadData: any): Observable<any> {
    return this.http.post(this.apiUrl, leadData);
  }
  
 
  updateCartDetails(leadId: number, payload:any[] ): Observable<any> {
        const url = `${this.apiUrl}/${leadId}/cart`;
        
        // The backend now expects a list of objects, so we send the array directly
        return this.http.put(url, payload);
    }
    // in lead.service.ts
 requestOtp(email: string): Observable<any> {
        // Add a responseType: 'text' option
        return this.http.post(`${this.apiUrl}/request-otp`, { email }, { responseType: 'text' });
    }


verifyOtp(data: { email: string, otp: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/verify-otp`, data);
}

  verifyLead(token: string): Observable<any> {
    // Ensure the URL is correctly formatted without a double slash
    return this.http.get(`${this.apiUrl}/verify?token=${token}`);
  }

}