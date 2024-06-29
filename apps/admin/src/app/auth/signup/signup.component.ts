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
    this.val = 2;
    const timer = setTimeout(() => {
     // this.val = 2;
      clearTimeout(timer);
    }, 500);
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.showEmailCodeForm = true;
    this.val = 3;
    const payload: User.tempUserData = {...form.value, role: Roles.Customer};
    console.log(payload);
    this.store.dispatch(AuthActions.authVerifyEmail({tempUserData: payload}));
  }

  onVerifyEmailSubmit(form: NgForm) {
    
    this.store.select(appStore.selectTempUser).subscribe((tempUserData) => {
      const stringifiedCode = ''+form.value._1 +form.value._2+form.value._3+form.value._4+form.value._5;
      const code = parseInt(stringifiedCode);
        const payload = {email: tempUserData?.email, code, tempUserData} as { email: string; code: number; tempUserData: User.tempUserData; };
        this.store.dispatch(AuthActions.authEmailVerified(payload));
    })
  }

  validateDigits(event: any) {
    const inputDigit = Number(event.key);
    const chars = event.target.name.split("");
    const digit = chars.splice(1,1);
    const digitNumber = Number(digit[0]) + 1;
    const nextInputName = '_' + digitNumber;
    if (inputDigit >= 0 && inputDigit <= 9 && Number(digit[0]) < 5) {
      document.getElementsByName(nextInputName)[0].focus();
    } else if ((event.key === 'Backspace' || event.key === 'Delete') && Number(digit[0]) > 1) {
      const priorInputName = '_' + (Number(digit[0]) - 1);
      document.getElementsByName(priorInputName)[0].focus();
    }
  }
}
