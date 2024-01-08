import { Route } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { EcommerceComponent } from './dashboard/ecommerce/ecommerce.component';
import { OrdersComponent } from './dashboard/ecommerce/orders/orders.component';
import { CustomersComponent } from './dashboard/ecommerce/customers/customers.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { NewProductComponent } from './dashboard/products/new-product/new-product.component';
import { ProductCategoriesComponent } from './dashboard/products/product-categories/product-categories.component';
import { ProductAttributesComponent } from './dashboard/products/product-attributes/product-attributes.component';
import { ProductTagsComponent } from './dashboard/products/product-tags/product-tags.component';
import { ProductReviewsComponent } from './dashboard/products/product-reviews/product-reviews.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

export const appRoutes: Route[] = [
    { path: '', component: DashboardComponent,
        canActivate: [() => false],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'home'},
            { path: 'home', component: HomeComponent },
            { path: 'products', component: ProductsComponent},
            { path: 'products/new', component: NewProductComponent},
            { path: 'products/categories', component: ProductCategoriesComponent},
            { path: 'products/attributes', component: ProductAttributesComponent},
            { path: 'products/tags', component: ProductTagsComponent},
            { path: 'products/reviews', component: ProductReviewsComponent},
            { path: 'ecommerce', component: EcommerceComponent},
            { path: 'ecommerce/orders', component: OrdersComponent},
            { path: 'ecommerce/customers', component: CustomersComponent}
        ]
    },
    { path: '', pathMatch: 'full', redirectTo: 'signup' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent }
];
