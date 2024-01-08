import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ecommerce-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ecommerce-nav.component.html',
  styleUrl: './ecommerce-nav.component.scss',
})
export class EcommerceNavComponent {
  menu: {name: string, url: string}[] = [
    {name: 'Home', url: '/'},
    {name: 'Orders', url: '/orders'},
    {name: 'Customers', url: '/customers'},
    {name: 'Reports', url: '/reports'},
    {name: 'Settings', url: '/settings'},
  ]
}
