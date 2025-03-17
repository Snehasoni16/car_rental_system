import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-car',
  standalone: false,
  
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {
postCarForm!: FormGroup;
isSpinning:boolean=false;
selectedFile: File | null = null;

imagePreview: string | ArrayBuffer | null = null;

listOfOption:Array<{label:string; value:string}>=[];
listOfBrands=["BMW","AUDI","FERRARI","TESLA","VOLVO","TOYOTA","HONDA","FORD","NISSAN","HYUNDAI","LEXUS","KIA"];
listOfType=["Petrol","Hybrid","Diesel","Electric","CNG"];
listOfColor=["Red","White","Blue","Black","Orange","Grey","Silver"];
listOfTransmission=["Manual","Automatic"];

constructor(private fb:FormBuilder,
  private adminService:AdminService,
  private message:NzMessageService,
  private router:Router
){}
ngOnInit(){
  this.postCarForm=this.fb.group({
    name:[null,Validators.required],
    brand:[null,Validators.required],
    type:[null,Validators.required],
    color:[null,Validators.required],
    transmission:[null,Validators.required],
    price:[null,Validators.required],
    description:[null,Validators.required],
    year:[null,Validators.required]


  })
}
postCar() {
  console.log(this.postCarForm.value);
 this.isSpinning=true;
  const formData: any = new FormData();

  // Ensure selectedFile is not undefined
  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  } else {
    console.warn("No image selected");
  }

  // Append form data fields
  formData.append('brand', this.postCarForm.get('brand')?.value);
  formData.append('name', this.postCarForm.get('name')?.value);
  formData.append('type', this.postCarForm.get('type')?.value);
  formData.append('color', this.postCarForm.get('color')?.value);
  formData.append('year', this.postCarForm.get('year')?.value);
  formData.append('transmission', this.postCarForm.get('transmission')?.value);
  formData.append('description', this.postCarForm.get('description')?.value);
  formData.append('price', this.postCarForm.get('price')?.value);

  console.log(formData);
  this.adminService.postCar(formData).subscribe((res)=>{
    this.isSpinning =false;
    
    this.message.success("Car posted successfully",{ nzDuration:5000});
    this.router.navigateByUrl("/admin/dashboard");
    console.log(res);
  },error=>{
    this.message.error("error while posting car",{nzDuration:5000});
  }
)
}


// onFileSelected(event:any){
//   this.selectedFile=event.target.files[0];
//   this.previewImage();

// }
onFileSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;

  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0]; // Assign the selected file

    
  }
}


previewImage(){
  if (this.selectedFile) { // ✅ Explicitly check if selectedFile is not null
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(this.selectedFile); // ✅ Now TypeScript knows it's not null
  }
  


}
}
