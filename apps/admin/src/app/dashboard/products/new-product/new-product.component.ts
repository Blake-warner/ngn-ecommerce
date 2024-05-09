import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  showNewCatField: boolean = false;
  categories: any = [];
  @ViewChild('newCat') newCategoryValue!: ElementRef;
  @ViewChild('catHierarchy') categoryHierarchy!: ElementRef;
  newCategorySubmit = false;

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

  onDisplayNewCatField() {
    this.showNewCatField = !this.showNewCatField;
  }

  onAddCategory(event: any) {
    event.preventDefault();
    const newCategory = {
      title: this.newCategoryValue.nativeElement.value,
      parent: this.categoryHierarchy.nativeElement.value
    }
    console.log(newCategory);
    this.categoryService.createCategory(newCategory).subscribe((category) => {
      console.log(category);
    })
  }

  onTypeNewCategory(event: any) {
    if(!event.target.value) {
      this.newCategorySubmit = false;
      return;
    }
    this.newCategorySubmit = true;
  }

  ngOnInit() {
    this.categoryService.fetchProductCategoryTree().subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
    });
    console.log(typeof this.newCategoryValue, " ", this.newCategoryValue)
  }
}
