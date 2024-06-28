import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
import { ProductDataComponent } from '../product-data/product-data.component';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductDataComponent],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent implements OnInit {
  showImageUpload: boolean = false;
  showNewCatField: boolean = false;
  categories: any = [];
  @ViewChild('newCat') newCategoryValue!: ElementRef;
  @ViewChild('productTitle') productForm!: ElementRef;
  @ViewChild('catHierarchy') categoryHierarchy!: ElementRef;
  @ViewChildren('cat') categoryList!: QueryList<ElementRef>;
  newCategorySubmit = false;
  newProductSubmit = false;

  constructor(
    private productService: ProductsService,
    private categoryService: ProductCategoriesService,
    ) { }

  onFormSubmit(form: NgForm, event: any) {
    //event.preventDefault();
    console.log(form);
    const productObject: any = {};
    productObject.categories = [];

    if(form.value.categories_list) {
      this.categoryList.forEach((cat) => {
        if(cat.nativeElement.checked) {
          const categoryObject = { title: cat.nativeElement.value };
          productObject.categories.push(categoryObject);
        }
      });
    }

    for(const key in form.value) {
      const appendPropertyField = (
        form.value[key] &&
        key !== 'cat-hierarchy' &&
        key !== 'categories_list' &&
        key !== 'category') ? true : false;

      if (appendPropertyField) {
        productObject[key] = form.value[key];
      }
    };
    this.productService.saveProduct(productObject).subscribe((product) => {
      console.log(product);
    });
 
    console.log(productObject);
  }

  onNewProductSubmit(event: any) {
    event.target.value;
    console.log(typeof event.target.value);
    this.newProductSubmit = event.target.value.length > 0 ? true : false;
    console.log(this.newProductSubmit);
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
    this.categoryService.createCategory(newCategory).subscribe((category) => {
      console.log(category);
    });
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
  }
}
