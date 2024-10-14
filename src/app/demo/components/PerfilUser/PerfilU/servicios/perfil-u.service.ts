import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilUService {
  private url = environment.URL_BACK;

  constructor(private http: HttpClient) { }

  obtenerUserPerfil(): Observable<any> {
    return this.http.get(`${this.url}api/user`, { withCredentials: true });
  }

  actualizarUserPerfil(userData: FormData): Observable<any> {
    return this.http.post(`${this.url}api/updateUser`, userData, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar el perfil:', error);
          return throwError(() => error);
        })
      );
  }

  ObtenerFotoUser(): Observable<any> {

    return this.http.get(`${this.url}api/getUserPhoto`, {withCredentials: true }) as Observable<any>;
  }

  getNotificatios(){
    return this.http.get(`${this.url}api/getNotifications`, {
      withCredentials: true
    }) as Observable<any>;
  }
}