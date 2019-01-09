import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup/signup-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './signup/location.filter.pipe';
import { RouterModule} from '@angular/router';
import { SuccessComponent } from './success/success/success.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {UsersData} from './usersData'

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    FilterPipe,
    SuccessComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'signup', component:SignupFormComponent},
      {path:'', redirectTo:'signup', pathMatch:'full'},
      {path:"success", component:SuccessComponent}
    ]),
    /* HttpClientInMemoryWebApiModule.forRoot(
      UsersData
    ) */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
