import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaregoryServiceService {

  url = environment.baseAdminUrl+"/categorias";

  constructor(private http: HttpClient) { }

  saveCategory(category : Category):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      })
    };

    return this.http.post(this.url, category, httpOptions)
      .pipe(
        map(response => response)
      );
  }
  getAllCategory(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  changeStatus(id:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    })
  }
  return this.http.put(`http://localhost:8000/api/admin/categorias/${id}/status`, httpOptions)
      .pipe(
        map(response => response)
      );
  }

  updateCategory(id:number, category:Category):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    })
  }
  return this.http.put(`http://localhost:8000/api/admin/categorias/${id}/`,category, httpOptions)
      .pipe(
        map(response => response)
      );
  }
}
