import { HttpInterceptorFn } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as appStore from '../store';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<appStore.State>);
  return store.select('auth').pipe(
    take(1),
    exhaustMap(authState => {
      console.log('interceptor: ', authState);
      if (!authState.user) {
        return next(req);
      }
      const modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authState.accessToken}`,
        }
      });
      return next(modifiedReq);
    }),
  );
};
