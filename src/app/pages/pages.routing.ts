import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [

    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data: {title: 'Dashboard'}},// -> navegate to DashboardComponent by default
          { path: 'progress', component: ProgressComponent, data: {title: 'Progress'}},
          { path: 'grafica1', component: Grafica1Component, data: {title: 'Grafica 1'}},
          { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Account Setting'}},
          { path: 'promesas', component: PromesasComponent, data: {title: 'Promises'}},
          { path: 'rxjs', component: RxjsComponent, data: {title: 'JXRS Observables'}},
          { path: 'profile', component: ProfileComponent, data: {title: 'Profile'}},
          
        ]
      },
      
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
