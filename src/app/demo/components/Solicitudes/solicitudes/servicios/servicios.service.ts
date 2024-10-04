import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private url = environment.URL_BACK;

  constructor(private http: HttpClient) { }

  // Método para obtener las solicitudes pendientes
  getPendingApprovals(): Observable<any> {
    return this.http.get(`${this.url}api/getPendingApprovals`, { withCredentials: true });
  }
  
  // Método para aceptar una solicitud
  acceptRequest(idUser: number, idWorkEnv: number): Observable<any> {
    return this.http.get(`${this.url}api/approbeRequestWorkEnv/${idUser}/${idWorkEnv}`, { withCredentials: true });
  }

  // Método para rechazar una solicitud
  rejectRequest(idJoinUserWork: number): Observable<any> {
    return this.http.get(`${this.url}api/notapprobeRequestWorkEnv/${idJoinUserWork}`, { withCredentials: true });
  }
}
