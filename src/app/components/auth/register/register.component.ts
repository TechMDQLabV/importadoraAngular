import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'app/models/UserLogin';
import { UserRegister } from 'app/models/UserRegister';
import { LoginService } from 'app/services/auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserRegister = new UserRegister();
  checkPassword: string;
  signupForm: FormGroup;

  constructor(private userService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.user.name = "";
    this.user.email = "";
    this.user.password = "";
    this.checkPassword = "";
    this.signupForm = new FormGroup({
      'name': new FormControl(this.user.name, { validators: [Validators.required]}),
      'email': new FormControl(this.user.email, { validators: [Validators.required, Validators.email]}),
      'password': new FormControl(this.user.password, [Validators.required]),
      'confirmPassword': new FormControl(this.checkPassword, [Validators.required])
    });
  }
  get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  signup() {
    let user = new UserRegister();
    user.name = this.name.value;
    user.email = this.email.value;
    user.password = this.password.value;
    console.log(user);
    
    this.userService.signup(user).subscribe(() => {
      alert("Alta Exitosa!");
      this.router.navigateByUrl("/login");
    }, error => {
      if (error.status === 409) {
        alert(`Error: el email: ${user.email} ya existe!`);
      } else {
        console.error(error);
        alert("Error: " + error.error.message);
      }
    })
  }
}
