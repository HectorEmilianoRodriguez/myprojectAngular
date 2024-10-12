import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../modelo/actividad'; // Asegúrate de que la ruta sea correcta
import { Group } from '../modelo/groups.model'; // Modelo para el grupo de tareas
import { Label } from '../modelo/label.model'; // Asegúrate de que la ruta sea correcta
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioTCService {
  private url = environment.URL_BACK; // URL base de tu API

  constructor(private http: HttpClient) { }

  // Obtener todos los grupos de tareas
  getTaskGroups(idJoinUserWork: number): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.url}api/getGroups/${idJoinUserWork}`);
  }

  // Crear un nuevo grupo
  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.url}api/newGroup`, group, { headers: this.getHeaders() });
  }

  // Editar un grupo
  editGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.url}api/editGroup`, group, { headers: this.getHeaders() });
  }

  // Eliminar un grupo
  deleteGroup(id: number): Observable<any> {
    return this.http.delete(`${this.url}api/deleteGroup/${id}`, { headers: this.getHeaders() });
  }

  // Obtener todas las actividades de un grupo
  getActivitiesByGroup(idgrouptaskcl: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.url}api/getActivitiesOfGroup/${idgrouptaskcl}`);
  }

  // Crear una nueva actividad
  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.url}api/newActCoordinator`, activity);
  }

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
