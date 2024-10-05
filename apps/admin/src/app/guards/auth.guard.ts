import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as appStore from '../store/index';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store<appStore.State>);
  const router = inject(Router);
  return store.select(appStore.isLoggedIn).pipe(
    map(loggedInState => {
      if(loggedInState) {
        return true;
      } else {
        router.navigate(['/signin']);
        return false;
      }
    })
  );
};
