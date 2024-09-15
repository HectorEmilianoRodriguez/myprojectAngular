import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entorno } from '../modelos/entorno.model';


@Injectable({
  providedIn: 'root'
})
export class EntornoService {
  private url = environment.URL_BACK;

  constructor(private http: HttpClient) {}

  getEntornos(): Observable<Entorno[]> {
    return this.http.get<Entorno[]>(`${this.url}/api/entornos`, { withCredentials: true });
  }
}