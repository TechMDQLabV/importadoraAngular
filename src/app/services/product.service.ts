import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "http://localhost:8000/api/admin/productos"

  constructor(private http: HttpClient) { }

  getAllProductsForUser(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  saveProduct(product):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      })
    };
    
    return this.http.post("http://localhost:8000/api/admin/productos", product, httpOptions)
      .pipe(
        map(response => response)
      );
  }
}
