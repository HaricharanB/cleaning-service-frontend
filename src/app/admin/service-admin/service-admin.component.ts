import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService, CleaningService } from 'src/app/admin.service';

@Component({
  selector: 'app-service-admin',
  templateUrl: './service-admin.component.html',
  styleUrls: ['./service-admin.component.css']
})
export class ServiceAdminComponent implements OnInit {
  services: CleaningService[] = [];
  serviceForm: FormGroup;
  isEditMode = false;
  selectedService: CleaningService | null = null;
  
  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.serviceForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      advanceAmount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.adminService.getAllServices().subscribe(data => {
      this.services = data;
    });
  }

  onEdit(service: CleaningService): void {
    this.isEditMode = true;
    this.selectedService = service;
    this.serviceForm.patchValue(service);
  }

  onDelete(serviceId: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.adminService.deleteService(serviceId).subscribe(() => {
        this.loadServices(); // Reload services after deletion
        this.onClearForm();
      });
    }
  }

  onSave(): void {
    if (this.serviceForm.valid) {
      if (this.isEditMode) {
        this.adminService.updateService(this.serviceForm.value).subscribe(() => {
          this.loadServices();
          this.onClearForm();
        });
      } else {
        this.adminService.addService(this.serviceForm.value).subscribe(() => {
          this.loadServices();
          this.onClearForm();
        });
      }
    }
  }

  onClearForm(): void {
    this.isEditMode = false;
    this.selectedService = null;
    this.serviceForm.reset();
  }
}