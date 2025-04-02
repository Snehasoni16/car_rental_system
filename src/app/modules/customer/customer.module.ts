import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookCarComponent } from './components/book-car/book-car.component';
import { NgZorroImpotsModule } from '../../NgZorroImportsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    BookCarComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgZorroImpotsModule,
    ReactiveFormsModule,FormsModule

  ]
})
export class CustomerModule { }
