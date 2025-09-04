import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { link } from 'fs';
import { url } from 'inspector';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories = [
    { name: 'Full House', image: 'assets/full-house.jpg' },
    { name: 'Commercial', image: 'assets/commercial.jpeg' },
    { name: 'Bathroom', image: 'assets/bathroom.png' },
    { name: 'Sofa', image: 'assets/sofa.png' },
    {name:'Mattress', image:'assets/mattress.jpeg'},
    {name:'Kitchen', image:'assets/Kitchen.webp'}
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  selectCategory(categoryName: string): void {
    // Navigate to the services page with a category query parameter
    this.router.navigate(['/services'], { queryParams: { category: categoryName } });
  }
}