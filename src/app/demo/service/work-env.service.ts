import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

// sedefine la estructura de los conteos de entornos de trabajo


export interface WorkEnvCounts {
  owner: number;
  participant: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkEnvService {
  private url = environment.URL_BACK;

  constructor(private http: HttpClient) {}

  getCounts(): Observable<WorkEnvCounts> {
    console.log('Solicitando conteos de entornos de trabajo al backend');
    return this.http.get<WorkEnvCounts>(`${this.url}api/CountMyWorkEnvs`, {
      withCredentials: true 
    });
  }
}
