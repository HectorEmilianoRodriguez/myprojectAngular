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
   postLogin(data): Observable<any>{
      return this.http.post(this.url + `api/login`,data, {withCredentials : true}) as Observable<any>;
      
   }

   //metodo para recuperacion de contraseña

   recuperarPassword(email):Observable<any>{
      return this.http.post(this.url + `api/`, { email }, { withCredentials: true }) as Observable<any>;
   }



}
