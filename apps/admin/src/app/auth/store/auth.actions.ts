import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Roles } from '../roles.enum';
import * as User from '../user';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Auth Verify Email': props<{ 
      tempUserData: User.tempUserData
    }>(),
    'Auth Signed Up': emptyProps(),
    'Auth Email Verified': props<{ 
      email: string,
      code: number,
      tempUserData: User.tempUserData
    }>(),
    'Auth Success': props<{
       email: string,
       id: string,
       first_name: string,
       last_name: string,
       role: Roles,
       token: string,
       _tokenExp: Date,
    }>(),
    'Auth Signin Start': props<{ 
      email: string, 
      password: string 
    }>(),
    'Auth Signup Start': props<{ 
      email: string, 
      password: string,
      first_name: string,
      last_name: string,
      role: Roles,
    }>(),
    'Auth Signout': emptyProps(),
    'Auth Failure': props<{ error: string }>(),
  }
});