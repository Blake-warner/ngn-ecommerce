import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategory } from './product-category';
import { ProductCategoriesService } from './product-categories.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-product-categories',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule],
  templateUrl: './product-categories.component.html',
  styleUrl: './product-categories.component.scss',
})
export class ProductCategoriesComponent implements OnInit {
  productCats: ProductCategory[] = [];
  constructor(private productCatsService: ProductCategoriesService){}

  ngOnInit() {
    this.productCatsService.fetchProductCategories().subscribe((categories) => {
      this.productCats = categories;
      this.dataSource = new MatTableDataSource<ProductCategory>(categories);
    })
  }

  displayedColumns: string[] = ['image', 'Name', 'Description', 'Slug', 'Count'];
  dataSource!: MatTableDataSource<ProductCategory>;
  selection = new SelectionModel<ProductCategory>(true, []);

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
  checkboxLabel(row?: ProductCategory): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }
}
