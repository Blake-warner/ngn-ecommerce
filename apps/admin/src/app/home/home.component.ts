import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DashboardComponent, MainMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
