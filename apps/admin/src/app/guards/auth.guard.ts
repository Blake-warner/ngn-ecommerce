import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import * as appStore from '../store/index';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store<appStore.State>);
  console.log('guard: ', store.select(appStore.isLoggedIn));
  return store.select(appStore.isLoggedIn).pipe(
    map(loggedInState => {
      if(loggedInState) {
        return true;
      } else {
        return false;
      }
    })
  )
};
