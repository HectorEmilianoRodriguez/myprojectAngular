import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilUService {
  private url = environment.URL_BACK;  // Asegúrate de que URL_BACK no termine con una barra

  constructor(private http: HttpClient) { }

  obtenerUserPerfil(): Observable<any> {
    return this.http.get(`${this.url}api/user`, { withCredentials: true });
  }

  actualizarUserPerfil(userData: FormData): Observable<any> {
    return this.http.post(`${this.url}api/updateUser`, userData, { withCredentials: true });
  }

  ObtenerFotoUser(): Observable<Blob | null> {
    return this.http.get(`${this.url}api/getUserPhoto`, { responseType: 'blob', withCredentials: true })
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            console.log('No se encontró la foto del usuario');
            return of(null);
          }
          return throwError(() => error);
        })
      );
  }
}