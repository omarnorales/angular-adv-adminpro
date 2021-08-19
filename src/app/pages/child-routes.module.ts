import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenances/users/users.component';
import { DoctorsComponent } from './maintenances/doctors/doctors.component';
import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { DoctorComponent } from './maintenances/doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [

  { path: '', component: DashboardComponent, data: {title: 'Dashboard'}},// -> navegate to DashboardComponent by default
  { path: 'progress', component: ProgressComponent, data: {title: 'Progress'}},
  { path: 'grafica1', component: Grafica1Component, data: {title: 'Grafica 1'}},
  { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Account Setting'}},
  { path: 'promesas', component: PromesasComponent, data: {title: 'Promises'}},
  { path: 'rxjs', component: RxjsComponent, data: {title: 'JXRS Observables'}},
  { path: 'profile', component: ProfileComponent, data: {title: 'Profile'}},
  { path: 'search/:term', component: SearchComponent, data: {title: 'Search'}},

  // maintenances
  { path: 'hospitals', component: HospitalsComponent, data: {title: 'Hospitals'}},
  { path: 'doctors', component: DoctorsComponent, data: {title: 'Doctors'}},
  { path: 'doctor/:id', component: DoctorComponent, data: {title: 'Doctor'}},
  
  // Rutas de admin
  { path: 'users', canActivate:[ AdminGuard ] , component: UsersComponent, data: {title: 'Users'}},
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
