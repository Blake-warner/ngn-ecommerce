import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { reducers } from './store';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [ importProvidersFrom(HttpClientModule, StoreDevtoolsModule.instrument(), FormsModule), provideEffects([AuthEffects]), provideStore(reducers), provideRouter(appRoutes)],
};
