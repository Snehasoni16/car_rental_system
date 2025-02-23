import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { provideNzI18n } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
//add
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgZorroImpotsModule } from './NgZorroImportsModule';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
     SignupComponent,
     LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
   // BrowserAnimationsModule,
    ReactiveFormsModule,
   NgZorroImpotsModule

  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
 
  providers: [
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
