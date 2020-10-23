import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/auth/login.service';
import { Router } from '@angular/router';
import { UserLogin } from 'app/models/UserLogin';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  focus2;
  user: UserLogin = new UserLogin();
  LoginForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.user.email = "";
    this.user.password= ""; 
    this.LoginForm = new FormGroup({
      'email': new FormControl(this.user.email, [Validators.required]),
      'password': new FormControl(this.user.password, [Validators.required])
    });
    let input_group_focus = document.getElementsByClassName('form-control');
    let input_group = document.getElementsByClassName('input-group');
    for (let i = 0; i < input_group.length; i++) {
        input_group[i].children[0].addEventListener('focus', function (){
            input_group[i].classList.add('input-group-focus');
        });
        input_group[i].children[0].addEventListener('blur', function (){
            input_group[i].classList.remove('input-group-focus');
        });
    }    
  }
  get email() { return this.LoginForm.get('email'); }
  get password() { return this.LoginForm.get('password'); }

  login(){
    
    let user = new UserLogin();
    user.email = this.email.value;
    user.password = this.password.value;
    this.loginService.login(user)
      .subscribe(response =>{
        if (localStorage.getItem('token')) {
          let redirect = this.loginService.redirectUrl ? this.router.parseUrl(this.loginService.redirectUrl) : "/home"
        
        this.router.navigateByUrl(redirect);
        }
      },error => {
        console.error(error)
        alert('Email o Password incorrect')
      });
  }

}
