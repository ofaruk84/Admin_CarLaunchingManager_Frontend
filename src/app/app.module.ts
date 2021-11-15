import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule} from '@angular/common/http';
import { NaviComponent } from './components/navi/navi.component';
import { CountryComponent } from './components/country/country.component';
import { DestinationComponent } from './components/destination/destination.component';
import { UserComponent } from './components/user/user.component';
import { AttendeeComponent } from './components/attendee/attendee.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CountryComponent,
    DestinationComponent,
    UserComponent,
    AttendeeComponent,
    LoginComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
