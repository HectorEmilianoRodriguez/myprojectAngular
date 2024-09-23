import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosCEService {
  private url = environment.URL_BACK;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  newWorkEnv(entornoData: any): Observable<any> {
    return this.http.post(`${this.url}api/newWorkEnv`, entornoData, {
      headers: this.getHeaders(),
      withCredentials: true
    });
  }
}
