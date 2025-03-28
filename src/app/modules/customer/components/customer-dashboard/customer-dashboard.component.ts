import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: false,
  
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {
  cars: any=[];
  constructor(private service: CustomerService){}

  ngOnInit(){
    this.getAllCars();
  }
  getAllCars() {
    this.service.getAllCars().subscribe((res: any[]) => { // 👈 Define response type
      console.log(res);
      
      res.forEach((element: any) => { // 👈 Define 'element' type
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    });
  }
}
