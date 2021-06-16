import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';









@Component({
  selector: 'app-appregister',
  templateUrl: './appregister.component.html',
  styleUrls: ['./appregister.component.css']
})
export class AppregisterComponent implements OnInit {

  public regForm: FormGroup
  public issubmitted:Boolean=false;
  public mainUserUrl="http://localhost:3000/users";
  public random:any;

  constructor(private router: Router, private formbuilder:FormBuilder,private http:HttpClient) {

    this.regForm=this.formbuilder.group({
      name:['',Validators.required],
      message:[''],
      email:['',[Validators.required,Validators.email]],
      phoneNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      address:['',Validators.required],
      pincode:['',Validators.required],
      age:[''],
      nationality:[''],
      username:['',Validators.required],
      password: ['',Validators.required],
      confirmPassword:['',Validators.required],
      verified:[true],
      cart:[[]],
      verificationCode:[''],
     

    


})
   }

  ngOnInit(): void {
    this.random=Math.floor(Math.random()*100000+1);
    
  }

 
  submit()
  {
    
    this.issubmitted=true;

     if(this.regForm.valid)
     { 
    
       this.regForm.value.verificationCode=this.random;
    this.http.post("http://localhost:3000/users",this.regForm.value).subscribe((data)=>
    {
      console.log(data,"Sumitted to data base");
      this.router.navigateByUrl('login');
    })

     }
    
    
   

    
   
  }


  

  get control()
  {
    return this.regForm.controls
  }

  travelToLogin()
  {
    this.router.navigateByUrl('login');
  }
  

}