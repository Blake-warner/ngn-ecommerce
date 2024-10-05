import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-data.component.html',
  styleUrl: './product-data.component.scss',
})
export class ProductDataComponent {

  display_product_data(tabName: string) {
    document.querySelectorAll('.tabs-display > div').forEach((div) => {
      if(div.id !== tabName) {
        div.classList.remove('show');
      }
    });
    (document.getElementById(tabName) as HTMLElement).classList.add('show');
  }
}
