import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Label } from '../../modelo/label.model'; // Asegúrate de que la ruta sea correcta
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanelService {
  private url = environment.URL_BACK; // URL base de tu API

  constructor(private http: HttpClient) { }

  // Obtener todas las etiquetas
  getLabels(idWork: number): Observable<Label[]> {
    return this.http.get<Label[]>(`${this.url}api/getLabels/${idWork}`);
  }

  // Crear una nueva etiqueta
  createLabel(label: Label): Observable<Label> {
    return this.http.post<Label>(`${this.url}api/newLabel`, label, { headers: this.getHeaders() });
  }

  // Editar una etiqueta
  editLabel(label: Label): Observable<Label> {
    return this.http.put<Label>(`${this.url}api/editLabel`, label, { headers: this.getHeaders() });
  }

  // Eliminar una etiqueta
  deleteLabel(id: number): Observable<any> {
    return this.http.delete(`${this.url}api/deleteLabel/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
