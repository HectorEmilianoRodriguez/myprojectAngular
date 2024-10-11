import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../modelo/actividad'; // Asegúrate de que la ruta sea correcta
import { Group } from '../modelo/groups.model'; // Modelo para el grupo de tareas
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioTCService {
  private url = environment.URL_BACK;

  constructor(private http: HttpClient) { }

  // Obtener todos los grupos de tareas
  getTaskGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.url}api/getTaskGroups`); // Asegúrate de que la URL sea correcta
  }

  // Obtener todas las actividades de un grupo
  getActivitiesByGroup(idgrouptaskcl: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.url}api/getActivitiesOfGroup/${idgrouptaskcl}`);
  }

  // Crear un nuevo grupo
  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.url}api/newGroup`, group, { headers: this.getHeaders() });
  }

  // Crear una nueva actividad
  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.url}api/newActivity`, activity, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Agrega otros encabezados si es necesario
    });
  }
}
