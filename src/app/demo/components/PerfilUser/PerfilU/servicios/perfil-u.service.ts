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

  ObtenerFotoUser(): Observable<Blob> {
    const timestamp = new Date().getTime();

    return this.http.get(`${this.url}api/getUserPhoto`, { responseType: 'blob', withCredentials: true })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al obtener la foto del usuario:', error);
          return throwError(() => error);
        })
      );
  }
}