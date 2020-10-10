import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from 'app/models/UserLogin';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { UserRegister } from 'app/models/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8000/api/auth/login";
  redirectUrl: string;

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(user: UserLogin): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      })
    };

    return this.http.post(this.url, user, httpOptions)
      .pipe(
        map(response =>{ 
          this.setToken(response)
          this.loggedIn.next(true)
        })
      );
  };

  private setToken(response: any): void {
    localStorage.setItem('token', response.access_token);
  };
  getToken() { return localStorage.getItem('token'); };
  
  logout(){
    localStorage.clear()
    this.loggedIn.next(false);
  }

  signup(user: UserRegister): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      })
    };
    return this.http.post("http://localhost:8000/api/auth/signup", user, httpOptions)
    .pipe(
      map(response => 
        console.log(response)        
        )
    );
  }
}
