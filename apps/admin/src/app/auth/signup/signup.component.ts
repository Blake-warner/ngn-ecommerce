import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as appStore from '../../store';
import { AuthActions } from '../store/auth.actions';
import { AuthService } from '../auth.service';
import * as CONSTANTS from '../../shared/constants';
import * as User from '../user';
import { Roles } from '../roles.enum';
import { ActivatedRoute } from '@angular/router';

type Val = 1 | 2 | 3;
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  send_email_endpoint = CONSTANTS.VERIFY_EMAIL_ENDPOINT;
  showEmailCodeForm: boolean = false;

  // change class names for animation

  classMap = {
    1: 'hide',
    2: 'show-auth',
    3: 'show-email-code',
  }
  val: Val = 1;

  constructor(private store: Store<appStore.State>, private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    const timer = setTimeout(() => {
      this.val = 2;
      clearTimeout(timer);
    }, 500);
  }

  onSubmit(form: NgForm) {
    this.showEmailCodeForm = true;
    this.val = 3;
    const payload: User.tempUserData = {...form.value, role: Roles.Customer};
    console.log(payload);
    this.store.dispatch(AuthActions.authVerifyEmail({tempUserData: payload}));
  }

  onVerifyEmailSubmit(form: NgForm) {
    
    this.store.select(appStore.selectTempUser).subscribe((tempUserData) => {
      const stringifiedCode = ''+form.value.num1+form.value.num2+form.value.num3+form.value.num4+form.value.num5;
      const code = parseInt(stringifiedCode);
      console.log(code, typeof code);
      const payload = {email: tempUserData.email, code, tempUserData};
      console.log(payload);
      this.store.dispatch(AuthActions.authEmailVerified(payload));
    })
  }
}
