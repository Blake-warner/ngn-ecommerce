import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as appStore from '../../store';
import { AuthActions } from '../store/auth.actions';
//import { Roles } from '../roles.enum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {

  constructor(private store: Store<appStore.State>, private authService: AuthService) {}
  showEmailCodeForm: boolean = false;
  onSubmit(form: NgForm) {
    this.showEmailCodeForm = true;
    this.store.dispatch(AuthActions.authVerifyEmail({tempUserData:form.value}));
 /*
    this.store.dispatch(AuthActions.authSignupStart({ 
      username: form.value.email, 
      password: form.value.password,
      first_name: form.value.firstname,
      last_name: form.value.lastname,
      role: Roles.Customer
    }));
*/
    const authState = this.store.select(appStore.selectAuth);
    console.log('auth state: ', authState);
  }
}
