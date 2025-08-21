// // in src/app/admin/admin-dashboard/admin-dashboard.component.ts

// import { Component, OnInit } from '@angular/core';
// import { AdminService } from 'src/app/admin.service';
// @Component({
//   selector: 'app-admin-dashboard',
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.css']
// })
// export class AdminDashboardComponent implements OnInit {
//   leads: any[] = [];
//   errorMessage = '';

//   constructor(private adminService: AdminService) { }

//   ngOnInit(): void {
//     // The AuthInterceptor will now handle adding the token
//     this.adminService.getAllLeads().subscribe(
//       (data) => {
//         this.leads = data;
//       },
//       (error) => {
//         this.errorMessage = 'Failed to load leads.';
//       }
//     );
//   }
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent { }
