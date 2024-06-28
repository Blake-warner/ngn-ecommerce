import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products-nav.component.html',
  styleUrl: './products-nav.component.scss',
})
export class ProductsNavComponent {
    menu: {name: string, url: string}[] = [
      { name: 'All Products', url: 'products' },
      { name: 'Add New', url: 'product/new' },
      { name: 'Categories', url: 'product/categories' },
      { name: 'Tags', url: 'product/tags' },
      { name: 'Attributes', url: 'product/attributes' },
      { name: 'Reviews', url: 'product/reviews' },
      { name: 'Taxonomy Order', url: 'product/taxonomy-order' },
    ]
}
