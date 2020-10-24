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
    this.user.lastName=""
    this.user.country= ""
    this.user.nationality= ""
    this.user.city= ""
    this.user.estimatedPrice= 0
    this.user.minAmount= 0
    this.user.companyName= ""
    this.user.adress= ""
    this.user.cuitCompany= ""
    this.user.phone= ""
    this.user.actionJob= ""
    this.user.activityCompany= ""
    this.user.email = "";
    this.user.password = "";
    this.checkPassword = "";
    this.signupForm = new FormGroup({
      'name': new FormControl(this.user.name, { validators: [Validators.required]}),
      'lastName': new FormControl(this.user.lastName, { validators: [Validators.required]}),
      'adress': new FormControl(this.user.adress, { validators: [Validators.required]}),
      'country': new FormControl(this.user.country, { validators: [Validators.required]}),
      'nationality': new FormControl(this.user.nationality, { validators: [Validators.required]}),
      'city': new FormControl(this.user.city, { validators: [Validators.required]}),
      'estimatedPrice': new FormControl(this.user.estimatedPrice, { validators: [Validators.required]}),
      'minAmount': new FormControl(this.user.minAmount, { validators: [Validators.required]}),
      'companyName': new FormControl(this.user.companyName, { validators: [Validators.required]}),
      'cuitCompany': new FormControl(this.user.cuitCompany, { validators: [Validators.required]}),
      'phone': new FormControl(this.user.phone, { validators: [Validators.required]}),
      'actionJob': new FormControl(this.user.actionJob, { validators: [Validators.required]}),
      'activityCompany': new FormControl(this.user.activityCompany, { validators: [Validators.required]}),
      'email': new FormControl(this.user.email, { validators: [Validators.required, Validators.email]}),
      'password': new FormControl(this.user.password, [Validators.required]),
      'confirmPassword': new FormControl(this.checkPassword, [Validators.required])
    });
  }
  get name() { return this.signupForm.get('name'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get adress() { return this.signupForm.get('adress'); }
  get country() { return this.signupForm.get('country'); }
  get nationality() { return this.signupForm.get('nationality'); }
  get city() { return this.signupForm.get('city'); }
  get estimatedPrice() { return this.signupForm.get('estimatedPrice'); }
  get minAmount() { return this.signupForm.get('minAmount'); }
  get companyName() { return this.signupForm.get('companyName'); }
  get cuitCompany() { return this.signupForm.get('cuitCompany'); }
  get phone() { return this.signupForm.get('phone'); }
  get actionJob() { return this.signupForm.get('actionJob'); }
  get activityCompany() { return this.signupForm.get('activityCompany'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  signup() {
    let user = new UserRegister();
    user.name = this.name.value;
    user.lastName = this.lastName.value;
    user.adress = this.adress.value;
    user.country = this.country.value;
    user.nationality = this.nationality.value;
    user.city = this.city.value;
    user.estimatedPrice = this.estimatedPrice.value;
    user.minAmount = this.minAmount.value;
    user.companyName = this.companyName.value;
    user.cuitCompany = this.cuitCompany.value;
    user.phone = this.phone.value;
    user.actionJob = this.actionJob.value;
    user.activityCompany = this.activityCompany.value;
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
