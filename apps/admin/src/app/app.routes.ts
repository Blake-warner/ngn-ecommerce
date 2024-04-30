import { Route } from '@angular/router';
//import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'signup' },
    {
        path: '',
        loadChildren: () =>
            import('./dashboard/dashboard.routes')
                .then(m => m.DASHBOARD_ROUTES)
    },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent }
];