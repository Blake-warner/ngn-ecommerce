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

export const DASHBOARD_ROUTES: Routes = [
    { path: '', component: DashboardComponent, children: [
        { path: 'products', component: ProductsComponent},
        { path: 'products/new', component: NewProductComponent},
        { path: 'products/categories', component: ProductCategoriesComponent},
        { path: 'products/attributes', component: ProductAttributesComponent},
        { path: 'products/tags', component: ProductTagsComponent},
        { path: 'products/reviews', component: ProductReviewsComponent},
        { path: 'ecommerce', component: EcommerceComponent},
        { path: 'ecommerce/orders', component: OrdersComponent},
        { path: 'ecommerce/customers', component: CustomersComponent}
    ]}
]