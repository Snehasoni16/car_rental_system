import { Component } from '@angular/core';
import { StorageService } from './auth/components/services/storage/storage.service';
import { Router } from '@angular/router';
import { every } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Car_rental_system_angular';

  isCustomerLoggedIn: boolean=StorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean=StorageService.isAdminLoggedIn();

  constructor(private router: Router){}
  ngOnInit(){
    this.router.events.subscribe(event=>
    {
      if(event.constructor.name==="NavigationEnd"){
        this.isAdminLoggedIn=StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn=StorageService.isCustomerLoggedIn();
      }
    }
    )
  }
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
