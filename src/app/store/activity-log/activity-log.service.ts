import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityLog } from 'src/app/Models/activity-log-model';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  constructor(private http: HttpClient) { }

  fetchActivityLogs(){
    const url: string = '/api/resources/activity_logs'; 
    return this.http.get(url)
  }

  addActivityLog(payload: ActivityLog): Observable<any>{
    const url:string = `/api/resources/activity_logs`
    return this.http.post(url, payload);
  }
}
