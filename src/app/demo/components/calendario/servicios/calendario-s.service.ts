import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActivity } from '../calendario/actividadmodel/Actividad';

@Injectable({
  providedIn: 'root'
})
export class CalendarioSService {
  private url = environment.URL_BACK;

  constructor(private http: HttpClient) { }

  getActivities(idJoinUserWork: number): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(`${this.url}api/Calendar/getActivities/${idJoinUserWork}`, { withCredentials: true });
  }

  getActivityById(id: string): Observable<IActivity> {
    return this.http.get<IActivity>(`/api/activities/${id}`); // dAdjust the API endpoint as necessary
  }

  newActivity(activityData: IActivity): Observable<IActivity> {
    return this.http.post<IActivity>(`${this.url}api/Calendar/newActivity`, activityData, { withCredentials: true });
  }

  editActivity(activityData: IActivity): Observable<IActivity> {
    return this.http.put<IActivity>(`${this.url}api/Calendar/editActivity`, activityData, { withCredentials: true });
  }

  deleteActivity(activityId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}api/Calendar/deleteActivity/${activityId}`, { withCredentials: true });
  }
}
