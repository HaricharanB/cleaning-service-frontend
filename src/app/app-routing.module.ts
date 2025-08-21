import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceListComponent } from './service-list/service-list.component';
import { VerificationComponent } from './verification/verification.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsComponent } from './terms/terms.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ServiceAdminComponent } from './admin/service-admin/service-admin.component';
import { AdminLeadComponent } from './admin-lead/admin-lead.component';
// const routes: Routes = [
//   { path: '', component: CategoryComponent }, // New root path
//   { path: 'services', component: ServiceListComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'verify', component: VerificationComponent },
//   { path: 'cart', component: CartComponent },
//   { path: 'about-us', component: AboutUsComponent },
//   { path: 'contact-us', component: ContactUsComponent },
//     { path: 'terms', component: TermsComponent },
//   { path: '**', redirectTo: '/services' } ,// Wildcard route for 404,
//   { path: 'admin/login', component: AdminLoginComponent },
//   {
//     path: 'admin',
//     component: AdminDashboardComponent,
//     children: [
//       { path: 'services', component: ServiceAdminComponent },
//       { path: 'leads', component: AdminLeadComponent }, // New route for leads
//       { path: '', redirectTo: 'services', pathMatch: 'full' }
//     ]
//   },
// ];
const routes: Routes = [
  { path: '', component: CategoryComponent },
   { path: 'login', component: LoginComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'verify', component: VerificationComponent },
  { path: 'cart', component: CartComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'services', component: ServiceAdminComponent },
      { path: 'leads', component: AdminLeadComponent },
      { path: '', redirectTo: 'services', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }