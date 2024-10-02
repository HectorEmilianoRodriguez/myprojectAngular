import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'

})
export class LoginService {
  private url = environment.URL_BACK;

  constructor( 

    private http:HttpClient
  ) {
     
     
   }
    
   ///metodo del servicio para el login 
   

   //metodo para recuperacion de contraseña

  recuperarPassword(email: any): Observable<any>{
      return this.http.get(this.url + `api/recoversent/${email}`) as Observable<any>;
   }

   

}
