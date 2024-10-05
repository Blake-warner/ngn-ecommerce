import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Store } from '@ngrx/store';
import * as appState from './store/index';
import {AuthActions} from './auth/store/auth.actions';

@Component({
  standalone: true,
  imports: [RouterModule, HomeComponent, MainMenuComponent, DashboardComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private store: Store<appState.State>) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.authAutoSignin());
    console.log(this.store);
  }
}
