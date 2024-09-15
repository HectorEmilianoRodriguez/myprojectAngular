import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Entorno } from '../modelos/entorno.model';;

@Injectable({
  providedIn: 'root'
})
export class ServiciosUnionService {

  private url = environment.URL_BACK;

  constructor(
    private http:HttpClient
  ) { 


  }

  getProyectoData(data:any) :Observable<any>{
    return this.http.get(this.url + `api/getMyWorkEnvs`,data, {withCredentials : true}) as Observable<any>;
     //modificar esto
  }

 
}
