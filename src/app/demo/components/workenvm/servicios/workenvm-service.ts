import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'

})
export class WorkEnvMService {
  private url = environment.URL_BACK;

  constructor( 

    private http:HttpClient
  ) {
     
     
   }
 
   //obtener la data del entorno.
   getWorkEnv(id: string):Observable<any>{
      return this.http.get(this.url + `api/AmIOnWorkEnv/${id}`, { withCredentials: true }) as Observable<any>;
   }

   getMembers(id: string):Observable<any>{
    return this.http.get(this.url + `api/getMembers/${id}`, { withCredentials: true }) as Observable<any>;
   }

   updateMember(id: number, idWork: number, priv: number):Observable<any>{
     return this.http.put(this.url+ `api/updateMember/${id}/${idWork}/${priv}`, {}, {withCredentials: true}) as Observable<any>;
   }

   deleteMember(id: number, name: string, mail: string, idWork: number, namew: string){
    return this.http.delete(this.url+ `api/deleteMember/${id}/${name}/${mail}/${idWork}/${namew}`, {withCredentials: true}) as Observable<any>;
   }

   inviteMember(email: string,  workenv: string, idWork: number){
    return this.http.get(this.url+ `api/inviteMember/${email}/${workenv}/${idWork}`, {withCredentials: true}) as Observable<any>;
   }    

   getBoards(id: number){
    return this.http.get(this.url+ `api/getBoards/${id}`, {withCredentials: true}) as Observable<any>;
   }

   newBoard(idw: number, name: string, desc:string){
    return this.http.post(this.url + `api/newBoard`, {

        idWorkEnv: idw,
        nameB: name,
        descriptionB: desc

    }, {withCredentials: true});
   }

}
