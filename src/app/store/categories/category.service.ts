import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/Models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  fetchCategories(){
    const url: string = '/api/resources/categories'; 
    return this.http.get(url)
  }

  addCategory(payload: Category): Observable<any>{
    const url:string = `/api/resources/categories`
    return this.http.post(url, payload);
  }

  updateCategory(payload: Category, id:number): Observable<any>{
    const url:string = `/api/resources/categories${id}`
    return this.http.post(url, payload);
  }

  deleteCategory(id: number): Observable<any>{
    const url:string = `/api/resources/categories${id}`
    return this.http.post(url,{});
  }
}
