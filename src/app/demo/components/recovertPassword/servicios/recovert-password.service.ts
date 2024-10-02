import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecovertPasswordService {
  private url = environment.URL_BACK;
  constructor(
    private http:HttpClient
  ) { }

  changuepass(token:any,email:any,pass:any): Observable<any>{
    return this.http.get(this.url + `api/changePassUser/${token}/${email}/${pass}`)
  }
}
