import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { reducers } from './store';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: !isDevMode(), // Restrict extension to log-only mode
        autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
        traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        connectInZone: true // If set to true, the connection is established within the Angular zone
      }),
      FormsModule,
    ),
    provideHttpClient(withInterceptors(
      [authInterceptor]
    )),
    provideEffects([AuthEffects]),
    provideStore(reducers),
    provideState({name: 'auth', reducer: reducers.auth}),
    provideState({name: 'products', reducer: reducers.products}),
    provideRouter(appRoutes)
  ],
};
