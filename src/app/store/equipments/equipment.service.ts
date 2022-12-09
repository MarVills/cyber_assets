import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment, EquipmentDTO } from 'src/app/Models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  fetchEquipment():Observable<any>{
    const url:string = `/api/resources/equipment`
    return this.http.get(url);
  }

  addEquipment(payload: Equipment): Observable<any>{
    const url:string = `/api/resources/equipment`
    return this.http.post(url, payload);
  }

  updateEquipment(payload: Equipment, id:number): Observable<any>{
    const url:string = `/api/resources/equipment/${id}`
    return this.http.post(url, payload);
  }

  deleteEquipment(id: number): Observable<any>{
    const url:string = `/api/resources/equipment/${id}`
    return this.http.post(url,{});
  }



}
