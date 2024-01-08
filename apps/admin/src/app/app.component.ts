import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, MainMenuComponent, DashboardComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin';
  items = ["one","one","one","one","one","one",];

}
