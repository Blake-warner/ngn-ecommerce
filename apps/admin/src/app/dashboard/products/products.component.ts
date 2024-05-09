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
import * as ProductActions from './store/product.actions';



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

  ngOnInit() {
    this.productsService.fetchProducts().subscribe((products) => {
      this.productsService.products$.next(products);
      this.dataSource = new MatTableDataSource<Product>(products);
      this.products = [...products];
      console.log(this.products);
    });

    this.categoriesService.fetchProductCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.store.dispatch(ProductActions.ProductActions.fetchProducts());
  }
}
