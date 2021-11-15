import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendeeComponent } from './components/attendee/attendee.component';
import { CountryComponent } from './components/country/country.component';
import { DestinationComponent } from './components/destination/destination.component';

import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [

  {path:'attendees',component:AttendeeComponent},
  {path:'users',component:UserComponent},
  {path:'login',component:LoginComponent},

  {path:'countries',component:CountryComponent},
  {path:'destinations',component:DestinationComponent},
  {path:'',redirectTo:'users',pathMatch:'full'},
  {path:'**',redirectTo:'users',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }