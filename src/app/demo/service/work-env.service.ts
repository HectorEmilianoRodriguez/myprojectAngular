import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

// sedefine la estructura de los conteos de entornos de trabajo


export interface WorkEnvCounts {
  owner: number;
  participant: number;
}

export interface WorkActiCounts {
  idWorkEnv: number,
  nameW: string,
  NotSeenComments: number,
  requests: number,
  AlmostExpiredOrExpiredActivities: number,
  PendingApprovalActivities: number
}

@Injectable({
  providedIn: 'root'
})
export class WorkEnvService {
  private url = environment.URL_BACK;

  constructor(private http: HttpClient) { }

  getCounts(): Observable<WorkEnvCounts> {
    return this.http.get<WorkEnvCounts>(`${this.url}api/CountMyWorkEnvs`, {
      withCredentials: true
    });
  }

  getActivitis(): Observable<WorkActiCounts>{
    return this.http.get<WorkActiCounts>(`${this.url}api/getAllStatsUser/`, {
      withCredentials: true
    });
  }

  getEntornos(): Observable<any>{
    return this.http.get<any>(`${this.url}api/getMyWorkEnvs`, {
      withCredentials: true
    });
  }

  getComents(): Observable<any>{
    return this.http.get<any>(`${this.url}api/getNotSeenComments`, {
      withCredentials: true
    });
  }

  getNotActivities(): Observable<any>{
    return this.http.get<any>(`${this.url}api/getNotApprobedActivities`, {
      withCredentials: true
    })
  }

  getPending(): Observable<any>{
    return this.http.get<any>(`${this.url}api/getPendingApprovals`, {
      withCredentials: true
    })
  }
  getExpired(): Observable<any>{
    return this.http.get<any>(`${this.url}api/getAlmostExpiredActivities`, {
      withCredentials:true
    })
  }
}
