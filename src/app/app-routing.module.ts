import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: AuthComponent },
  {path: 'main', component: MainComponent, canActivate:[AuthGuardGuard] },
  {path: 'cart', component: CartComponent, canActivate:[AuthGuardGuard] },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
