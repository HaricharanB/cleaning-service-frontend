import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
export interface CategoryList {
  id: number;
  name: string;
  maxOrdersPerDay: number;
}

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  categories: CategoryList[] = [];
  categoryForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      maxOrdersPerDay: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.adminService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onEdit(category: CategoryList): void {
    this.isEditMode = true;
    this.categoryForm.patchValue(category);
  }

  onDelete(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.adminService.deleteCategory(categoryId).subscribe(() => {
        this.loadCategories();
        this.onClearForm();
      });
    }
  }

  onSave(): void {
    if (this.categoryForm.valid) {
      if (this.isEditMode) {
        this.adminService.updateCategory(this.categoryForm.value).subscribe(() => {
          this.loadCategories();
          this.onClearForm();
        });
      } else {
        this.adminService.addCategory(this.categoryForm.value).subscribe(() => {
          this.loadCategories();
          this.onClearForm();
        });
      }
    }
  }

  onClearForm(): void {
    this.isEditMode = false;
    this.categoryForm.reset();
  }
}
