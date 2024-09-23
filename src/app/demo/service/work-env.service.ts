import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface WorkEnvCounts {
  owner: number;
  participant: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkEnvService {
  private url = environment.URL_BACK;
  private ownerCount = signal<number>(0);
  private participantCount = signal<number>(0);

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  refreshCounts(): Observable<WorkEnvCounts> {
    console.log('Solicitando conteos de entornos de trabajo al backend');
    return this.http.get<WorkEnvCounts>(`${this.url}api/CountMyWorkEnvs`, {
      headers: this.getHeaders(),
      withCredentials: true
    }).pipe(
      tap(counts => {
        console.log('Conteos recibidos del backend:', counts);
        this.ownerCount.set(counts.owner);
        this.participantCount.set(counts.participant);
        console.log(`Conteos actualizados - Dueño: ${this.ownerCount()}, Participante: ${this.participantCount()}`);
      })
    );
  }

  ownerEnvs(): number {
    return this.ownerCount();
  }

  participantEnvs(): number {
    return this.participantCount();
  }
}
