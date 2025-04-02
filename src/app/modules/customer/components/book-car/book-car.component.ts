import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../auth/components/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-book-car',
  standalone: false,
  
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {

  carId: number;
  car:any;
  processedImage:any;
  validateForm!: FormGroup;
  isSpinning=false;
  //dateFormat:"DD-MM-YYYY";
  dateFormat: string = 'YYYY-MM-DD';

  constructor(
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message:NzMessageService,
    private router: Router
  ) {
    this.carId = this.activatedRoute.snapshot.params["id"];
    console.log(this.dateFormat);
  }
  

  ngOnInit(){
   this.validateForm = this.fb.group({
    toDate: [null,Validators.required],
    fromDate:[null,Validators.required]
   })
 this.getCarById();
  }
  getCarById(){
    this.service.getCarById(this.carId).subscribe((res)=>{
      console.log(res);
      this.processedImage='data:image/jpeg;base64,' + res.returnedImage;
      this.car=res;
    })

  }
bookACar(data:any){
console.log(data);
this.isSpinning=true;
let bookACarDto ={
  toDate: data.toDate,
  fromDate:data.fromDate,
  userId:StorageService.getUserId(),
  carId:this.carId
}
// this.service.bookACar(bookACarDto).subscribe((res)=>{
//   console.log(res);
//   this.message.success("Booking request submitted successfully!",{nzDuration:5000});
//   this.router.navigateByUrl("/customer/dashboard");
// },error =>{
//   this.message.error("Something went wrong ",{nzDuration:5000})
// }
// )
// }
this.service.bookACar(bookACarDto).subscribe({
  next: (res) => {
    console.log(res);
    this.message.success("Booking request submitted successfully!", { nzDuration: 5000 });
    this.router.navigateByUrl("/customer/dashboard");
  },
  error: (error) => {
    console.error("Booking error:", error);
    this.message.error(error.error?.message || "Something went wrong", { nzDuration: 5000 });
  }
});


}}
