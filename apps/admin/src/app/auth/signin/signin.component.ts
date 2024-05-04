import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as appStore from '../../store';
import { AuthActions } from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  constructor(private store: Store<appStore.State>) {}

  onSubmit(form: NgForm) {
    const payload = {
      email: form.value.email,
      password: form.value.password
    };
    this.store.dispatch(AuthActions.authSigninStart(payload));
  }
}
