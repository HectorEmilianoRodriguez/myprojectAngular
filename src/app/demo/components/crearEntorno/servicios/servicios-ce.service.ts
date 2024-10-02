import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServiciosCEService {
  private url = environment.URL_BACK;

  constructor(private http: HttpClient) { }

  newWorkEnv(entornoData: any): Observable<any> {
    return this.http.post(this.url + `api/newWorkEnv`, entornoData, { withCredentials: true }) as Observable<any>;
  }
  }
