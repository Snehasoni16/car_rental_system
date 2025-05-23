import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-update-car',
  standalone: false,
  
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {

isSpinning =false;  
carId:number;
imgChanged:boolean=false;
selectedFile:any;
//imagePreview:string|ArrayBuffer|null;
imagePreview!: string | ArrayBuffer | null;
existingImage: String | null = null;
updateForm! : FormGroup;

listOfOption:Array<{label:string; value:string}>=[];
listOfBrands=["BMW","AUDI","FERRARI","TESLA","VOLVO","TOYOTA","HONDA","FORD","NISSAN","HYUNDAI","LEXUS","KIA"];
listOfType=["Petrol","Hybrid","Diesel","Electric","CNG"];
listOfColor=["Red","White","Blue","Black","Orange","Grey","Silver"];
listOfTransmission=["Manual","Automatic"];


  constructor(private adminService:AdminService,
    private activatedRoute:ActivatedRoute ,
    private fb: FormBuilder ,
    private message:NzMessageService,
    private router: Router ,
    
  ){this.carId = this.activatedRoute.snapshot.params["id"];}
  ngOnInit(){
    this.updateForm=this.fb.group({
    name:[null,Validators.required],
    brand:[null,Validators.required],
    type:[null,Validators.required],
    color:[null,Validators.required],
    transmission:[null,Validators.required],
    price:[null,Validators.required],
    description:[null,Validators.required],
    year:[null,Validators.required]


    })
    this.getCarById();
  }
  // getCarById(){
  //   this.adminService.getCarById(this.carId).subscribe((res)=>{
  //    // console.log(res);
  //     const carDto=res;
  //     this.existingImage='data:image/jpeg;base64,'+res.returnedImage;
  //     console.log(carDto);
  //   })
  // }
  // getCarById() {
  //   this.isSpinning = true;
  //   this.adminService.getCarById(this.carId).subscribe(
  //     (res) => {
  //       this.isSpinning=false;
  //       console.log('Full API Response:', res);
  //       if (res && res.returnedImage) {
  //         this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
  //         console.log(this.existingImage);
  //         this.updateForm.patchValue(carDto);
  //       } else {
  //         console.warn('No image found for this car.');
  //         this.existingImage = 'assets/default-car.png'; // Use a placeholder image
  //       }
  //     },
  //     (error) => {
  //       console.error('API Error:', error);
  //     }
  //   );
  // }
  getCarById() {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe(
      (res) => {
        this.isSpinning = false;
        console.log('Full API Response:', res);

        if (res && res.returnedImage) {
          this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
          console.log(this.existingImage);
        } else {
          console.warn('No image found for this car.');
          this.existingImage = 'assets/default-car.png'; // Use a placeholder image
        }

        if (res) {
          this.updateForm.patchValue(res); // Assuming `res` contains the form data
        } else {
          console.warn('No car data found.');
        }
      },
      (error) => {
        this.isSpinning = false;
        console.error('API Error:', error);
      }
    );
}

// calling update API in Angular
updateCar(){
  console.log(this.updateForm.value);
  this.isSpinning=true;
   const formData: any = new FormData();
 if(this.imgChanged && this.selectedFile)
   // Ensure selectedFile is not undefined
  {
    formData.append('image',this.selectedFile);
  }
 
   // Append form data fields
   formData.append('brand', this.updateForm.get('brand')?.value);
   formData.append('name', this.updateForm.get('name')?.value);
   formData.append('type', this.updateForm.get('type')?.value);
   formData.append('color', this.updateForm.get('color')?.value);
   formData.append('year', this.updateForm.get('year')?.value);
   formData.append('transmission', this.updateForm.get('transmission')?.value);
   formData.append('description', this.updateForm.get('description')?.value);
   formData.append('price', this.updateForm.get('price')?.value);
 
   console.log(formData);
   this.adminService.updateCar( this.carId ,formData).subscribe((res)=>{
     this.isSpinning =false;
     
     this.message.success("Car updated successfully",{ nzDuration:5000});
     this.router.navigateByUrl("/admin/dashboard");
     console.log(res);
   },error=>{
     this.message.error("error while updating car",{nzDuration:5000});
   }
 )
}
onFileSelected(event:any){
this.selectedFile=event.target.files[0];
this.imgChanged=true;
this.existingImage=null;
this.previewImage();
}
previewImage(){
  const reader=new FileReader();
  reader.onload = () =>{
    this.imagePreview =reader.result;
  }
  reader.readAsDataURL(this.selectedFile);
}
  
}
