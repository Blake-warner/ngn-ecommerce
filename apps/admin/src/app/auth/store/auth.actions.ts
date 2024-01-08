import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Roles } from '../roles.enum';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Auth Success': props<{ user: 
      {
        email: string,
        id: string,
        token: string,
        tokenExp: Date
      }
    }>(),
    'Auth Signin Start': props<{ 
      username: string, 
      password: string 
    }>(),
    'Auth Signup Start': props<{ 
      username: string, 
      password: string,
      first_name: string,
      last_name: string,
      role: Roles
    }>(),
    'Auth Signout': emptyProps(),
    'Auth Failure': props<{ error: string }>(),
  }
});
