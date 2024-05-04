import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { ProductsComponent } from "./products/products.component";
import { NewProductComponent } from "./products/new-product/new-product.component";
import { ProductCategoriesComponent } from "./products/product-categories/product-categories.component";
import { ProductAttributesComponent } from "./products/product-attributes/product-attributes.component";
import { ProductTagsComponent } from "./products/product-tags/product-tags.component";
import { ProductReviewsComponent } from "./products/product-reviews/product-reviews.component";
import { EcommerceComponent } from "./ecommerce/ecommerce.component";
import { OrdersComponent } from "./ecommerce/orders/orders.component";
import { CustomersComponent } from "./ecommerce/customers/customers.component";
import { productsResolver } from "./products/products.resolver";
import { authGuard } from "../guards/auth.guard";
import { DashboardHomeComponent } from "./dashboard-home/dashboard-home.component";

export const DASHBOARD_ROUTES: Routes = [
    { path: '', 
        component: DashboardComponent, 
        canActivate: [authGuard],
        children: [
            { path: '', component: DashboardHomeComponent},
            { path: 'products', component: ProductsComponent, 
                resolve: {
                    products: productsResolver
                }
            },
            { path: 'product/new', component: NewProductComponent},
            { path: 'product/categories', component: ProductCategoriesComponent},
            { path: 'product/attributes', component: ProductAttributesComponent},
            { path: 'product/tags', component: ProductTagsComponent},
            { path: 'product/reviews', component: ProductReviewsComponent},
            { path: 'ecommerce', component: EcommerceComponent},
            { path: 'ecommerce/orders', component: OrdersComponent},
            { path: 'ecommerce/customers', component: CustomersComponent}
        ]
    }
]