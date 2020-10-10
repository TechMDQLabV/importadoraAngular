import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from '../models/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  url = "http://localhost:8000/api/admin/categorias/tags/"

  constructor(private http: HttpClient) { }

  getAllTagsForCategory(idCategory): Observable<any> {
    return this.http.get<any>(this.url+idCategory);
  }

  saveTag(tag):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      })
    };

    return this.http.post("http://localhost:8000/api/admin/categorias/tag", tag, httpOptions)
      .pipe(
        map(response => response)
      );
  }

  changeStatus(id:number):Observable<any>{
    const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      })
    }
    return this.http.put(`http://localhost:8000/api/admin/categorias/tag/${id}/status`, httpOptions)
        .pipe(
          map(response => response)
        );
  }

  delete(idTag): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/api/admin/categorias/tag/${idTag}`);
  }

  updateTag(id: number,tag: Tag):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      })
    }
    return this.http.put(`http://localhost:8000/api/admin/categorias/tag/${id}`,tag, httpOptions)
        .pipe(
          map(response => response)
        );
  }
  
}
