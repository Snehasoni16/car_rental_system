import { Component } from '@angular/core';
import{FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import{NzMessageService} from "ng-zorro-antd/message";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
isSpinning : boolean=false;
loginForm!:FormGroup;
constructor(private fb:FormBuilder
  ,private authService: AuthService
){}
ngOnInit(){
  this.loginForm=this.fb.group({
   email:[null,[Validators.email,Validators.required]],
   password:[null,[Validators.required]] 
  })
}
login(){
  console.log(this.loginForm.value);
  this.authService.login(this.loginForm.value).subscribe((res)=>{
    console.log(res);
  })
}
}


