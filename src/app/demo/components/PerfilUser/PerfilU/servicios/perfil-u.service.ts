import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class PerfilUService {
  private url = environment.URL_BACK;

  constructor(private http: HttpClient) { }

   obtenerUserPerfil(): Observable<any>{
    return this.http.get(`${this.url}/user`);
        
   }

   actualizarUserPerfil(userData : FormData): Observable<any>{
    return this.http.post(`${this.url}/updateUser`, userData);
 

   }

   

   ObtenerFotoUser(): Observable<any>{
    return this.http.get(`${this.url}/getUserPhoto`, { responseType: 'blob' });
  
   }



}
