import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { Store } from '@ngrx/store';
import * as appStore from '../store/index';
import { AuthActions } from '../auth/store/auth.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MainMenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store<appStore.State>) {}

  getState() {
    console.log('get state btn');
    this.store.select(appStore.auth).subscribe((state) => {
      console.log('state: ', state);
    });
  }

  ngOnInit() {
    console.log('dashboard compnoent')
    this.store.select(appStore.auth).subscribe((state) => {
      console.log('state: ', state);
    });
  }

  onSignOut() {
    this.store.dispatch(AuthActions.authSignout());
  }
}
