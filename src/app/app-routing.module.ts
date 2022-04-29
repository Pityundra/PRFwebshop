import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', component: AuthComponent },
  {path: 'main', component: MainComponent },
  {path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
