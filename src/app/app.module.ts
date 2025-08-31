import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificationComponent } from './verification/verification.component';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { TermsComponent } from './terms/terms.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ServiceAdminComponent } from './admin/service-admin/service-admin.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminLeadComponent } from './admin-lead/admin-lead.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OrdinalDatePipe } from './ordinal-date.pipe';



@NgModule({
  declarations: [
    AppComponent,
    ServiceListComponent,
    VerificationComponent,
    CartComponent,
    NavComponent,
    RegisterComponent,
    AboutUsComponent,
    ContactUsComponent,
    FooterComponent,
    TermsComponent,
    CategoryComponent,
    LoginComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    ServiceAdminComponent,
    AdminNavComponent,
   AdminLeadComponent,
   OrdinalDatePipe
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule
  
    
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
