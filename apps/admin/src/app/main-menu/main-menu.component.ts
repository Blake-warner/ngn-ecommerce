import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceNavComponent } from './ecommerce-nav/ecommerce-nav.component';
import { ProductsNavComponent } from './products-nav/products-nav.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    CommonModule, 
    EcommerceNavComponent, 
    ProductsNavComponent
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {}
