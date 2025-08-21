import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-leads',
  templateUrl: './admin-lead.component.html',
  styleUrls: ['./admin-lead.component.css']
})
export class AdminLeadComponent implements OnInit {
  leads: any[] = [];
  errorMessage = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllLeads().subscribe(
      data => {
        this.leads = data;
      },
      error => {
        this.errorMessage = 'Failed to load leads.';
      }
    );
  }
}