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
      { name: 'Categories', url: 'categories' },
      { name: 'Tags', url: 'tags' },
      { name: 'Attributes', url: 'attributes' },
      { name: 'Reviews', url: 'reviews' },
      { name: 'Taxonomy Order', url: 'taxonomy-order' },
    ]
}
