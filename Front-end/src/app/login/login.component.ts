import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private _http:HttpClient, private route:Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  logIn(){
    this._http.get<any>("http://localhost:3000/posts").subscribe(res=>{
      const User = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password

      })
      if(User){
        alert("Login successfull Welcome")
        this.loginForm.reset();
        this.router.navigate(['nav'])
      }else{
        alert("user not found,signup")
      }
    },err =>{
      alert("error in server side")
    })
  }
  }