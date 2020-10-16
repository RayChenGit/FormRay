import {Component, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CardComponent} from './component/card/card.component';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {MyAccountComponent} from './component/my-account/my-account.component';
import {RegisterComponent} from './component/register/register.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {BankerComponent} from './component/banker/banker.component';
import {AdminComponent} from './component/admin/admin.component';
import {CardDetailComponent} from './component/card/card-detail/card-detail.component';
import {ApplyComponent} from './component/apply/apply.component';
import {DemoComponent} from './component/demo/demo.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'card',
    component: CardComponent
  },
  {
    path: 'card-detail/:id',
    component: CardDetailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'apply',
    component: ApplyComponent
  },
  {
    path: 'myAccount',
    canLoad: [AuthGuard],
    loadChildren: () => import('./component/my-account/my-account.module').then(m => m.MyAccountModule)
  },
  {
    path: 'banker',
    canLoad: [AuthGuard],
    loadChildren: () => import('./component/banker/banker.module').then(m => m.BankerModule)
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
