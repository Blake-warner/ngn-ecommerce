import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import * as appStore from '../store/index';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  return inject(Store).select(appStore.selectAuth).pipe(
    take(1),
    map(user => {
      if(user.token) {
        return true;
      }
      return false;
    })
  )
};