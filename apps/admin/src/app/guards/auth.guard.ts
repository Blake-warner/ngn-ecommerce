import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import * as appStore from '../store/index';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store<appStore.State>);
  if(!store.select(appStore.isLoggedIn)) {
    return false;
  }
  return true;
};
