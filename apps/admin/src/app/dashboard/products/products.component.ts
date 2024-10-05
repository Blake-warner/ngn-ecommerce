import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from './product';
import { Store } from '@ngrx/store';
import * as appStore from '../../store';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from './products.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductCategoriesService } from './product-categories/product-categories.service';
import { ProductCategory } from './product-categories/product-category';
import { ProductActions } from './store/product.actions';
//import {ProductActions} from './store/product.actions';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public categories: ProductCategory[] = [];
  constructor(
    private store: Store<appStore.State>,
    private http: HttpClient,
    private productsService: ProductsService,
    private categoriesService: ProductCategoriesService,
    private activatedRoute: ActivatedRoute,
    ) {

  }

  displayedColumns: string[] = ['select', 'title', 'sku', 'stock', 'price', 'categories', 'attributes'];
  dataSource!: MatTableDataSource<Product>;
  selection = new SelectionModel<Product>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }

  getProducts() {
    this.store.select('products').subscribe((products) => {
      console.log(products.products);
    });
  }

  ngOnInit() {
    /*this.productsService.fetchProducts().subscribe((products) => {
      this.productsService.products$.next(products);
      this.dataSource = new MatTableDataSource<Product>(products);
      this.products = [...products];
      console.log(this.products);
    });
    */

    console.log(
      'Activated route data in Component:::',
      this.activatedRoute.data
    );
    this.activatedRoute.data.subscribe((response: any) => {
      console.log('PRODUCT FETCHING', response);
      this.products = response.products;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      console.log('PRODUCT FETCHED');

    });

    this.categoriesService.fetchProductCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.store.dispatch(ProductActions.fetchProducts());

    this.store.dispatch(ProductActions.setProducts({products: [
      {
        "id": 1,
        "sku": "660a884a-fd0e-4edb-a8d2-8f8c513be5ac",
        "title": "product one",
        "main_image": "/product-two-main-image.jpg",
        "price": 23,
        "sales_price": 20,
        "categories": [],
        description: 0,
        attributes: []
      },
      {
        "id": 2,
        "sku": "9489b413-4155-415c-9ad7-2612af7764fd",
        "title": "product two",
        "main_image": "/product-two-main-image.jpg",
        "price": 45,
        "sales_price": 35,
        "categories": [],
        description: 0,
        attributes: []
      },
      {
        "id": 3,
        "sku": "cca6af83-b4c9-476c-ae99-68312742695a",
        "title": "product three",
        "main_image": "/product-two-main-image.jpg",
        "price": 45,
        "sales_price": 35,
        "categories": [],
        description: 0,
        attributes: []
      },
      {
        "id": 4,
        "sku": "995640d5-24bb-41be-8cd4-0ded7787c487",
        "title": "product three",
        "main_image": "/product-two-main-image.jpg",
        "price": 45,
        "sales_price": 35,
        "categories": [
          {
            "id": 8,
            "title": "jackets",
            description: '',
            children: []
          }
        ],
        description: 0,
        attributes: []
      },
      {
        "id": 5,
        "sku": "d02b3df2-1db9-4dc5-8cdf-c232de1bcda2",
        "title": "Best Product",
        "main_image": "/best-product-main-image.jpg",
        "price": 100,
        "sales_price": 75,
        "categories": [
          {
            "id": 8,
            "title": "jackets",
            description: '',
            children: []
          }
        ],
        description: 0,
        attributes: []
      },
      {
        "id": 6,
        "sku": "9c5843ff-dd78-4421-a2f0-b86ee94c9bdd",
        "title": "worsed Product",
        "main_image": "/worsed-product-main-image.jpg",
        "price": 100,
        "sales_price": 75,
        "categories": [
          {
            "id": 7,
            "title": "shirts",
            description: '',
            children: []
          }
        ],
        description: 0,
        attributes: []
      },
      {
        "id": 7,
        "sku": "c899202f-2dad-424e-b453-e9349f454c4d",
        "title": "worsed Product",
        "main_image": "/worsed-product-main-image.jpg",
        "price": 100,
        "sales_price": 75,
        "categories": [
          {
            "id": 7,
            "title": "shirts",
            description: '',
            children: []
          }
        ],
        description: 0,
        attributes: []
      },
      {
        "id": 8,
        "sku": "a5433141-7798-4846-b36b-da1f7bb669d6",
        "title": "new product",
        "main_image": "/new-product-main-image.jpg",
        "price": 100,
        "sales_price": 75,
        "categories": [
          {
            "id": 7,
            "title": "shirts",
            description: '',
            children: []
          }
        ],
        description: 0,
        attributes: []
      },
    ]}));

    this.store.dispatch(ProductActions.addProduct({ product: {
      "id": 9,
      "sku": "a5433141-7798-4846-b36b-da1f7bb669d6",
      "title": "The best motherfucking product of all time",
      "main_image": "/new-product-main-image.jpg",
      "price": 100,
      "sales_price": 75,
      "categories": [
        {
          "id": 7,
          "title": "shirts",
          description: '',
          children: []
        }
      ],
      description: 0,
      attributes: []
    }}));
    
  }
}
