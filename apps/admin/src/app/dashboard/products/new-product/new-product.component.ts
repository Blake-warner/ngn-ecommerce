import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
import { ProductCategory } from '../product-categories/product-category';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent implements OnInit {
  showImageUpload: boolean = false;
  categories: ProductCategory[] = [];
  constructor(
    private productService: ProductsService,
    private categoryService: ProductCategoriesService,
    ) { }

  onFormSubmit(form: NgForm) {
    console.log(form);
  }

  imageUpload() {
    this.showImageUpload = !this.showImageUpload;
  }

  ngOnInit() {
    this.categoryService.fetchProductCategories().subscribe((categoires) => {
      this.categories = categoires;
      console.log(this.categories);
    });
  }
}
