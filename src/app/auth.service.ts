import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
  sub: string; // username/email
  leadId?: number; // optional
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

 
    login(credentials: any): Observable<string> {
    return this.http.post(`${this.authUrl}/login`, credentials, { responseType: 'text' }).pipe(
      tap((response: string) => {
        localStorage.setItem('jwt_token', response);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }
 getLeadId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.leadId ?? null; // null if not present
    } catch (e) {
      console.error('Invalid JWT token');
      return null;
    }
  }
  // This is the new method you were looking for
  loginWithToken(token: string): void {
    localStorage.setItem('jwt_token', token);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
    getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub;
    } catch {
      return null;
    }
  }

}

