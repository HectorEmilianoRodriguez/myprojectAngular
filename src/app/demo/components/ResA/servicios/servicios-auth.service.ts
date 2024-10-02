import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiciosAuthService {
  private url = environment.URL_BACK;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  restaurarBaseDeDatos(archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('backup_file', archivo, archivo.name);

    //return this.http.post(this.url + `api/database/restore`, formData, { withCredentials: true }) as Observable<any>;
    return this.http.post(this.url + `api/database/restore`, formData, { 
      headers: this.getHeaders(),
      withCredentials: true 
    }) as Observable<any>;
  }

  /*
  respaldarBaseDeDatos(): Observable<Blob> {
    return this.http.get(`${this.url}/api/backup-database`, {
      headers: this.getHeaders(),
      responseType: 'blob',
      withCredentials: true
    });
  }*/
}