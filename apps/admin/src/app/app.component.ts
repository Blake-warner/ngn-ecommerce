import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'angular-nest-eccomerce-platform-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin';
  items = ["one","one","one","one","one","one",];

}