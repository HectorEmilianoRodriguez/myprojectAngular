import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';


@Injectable({
  providedIn: 'root'

})


export class BoardService {

    endpoint = environment.URL_BACK;


    constructor(private http: HttpClient){

    }
    getBoard(idb: number, idw: number){
        return this.http.post(this.endpoint + `api/getBoard`, {
            idWorkEnv: idw,
            idBoard: idb
        }, {withCredentials: true}) as Observable<any>;
    }

    editBoard(idb: number, idw: number, nameB: string, descriptionB: string){
        return this.http.put(this.endpoint + 'api/editBoard', {
            idWorkEnv: idw,
            idBoard: idb,
            nameB: nameB,
            descriptionB: descriptionB
        }, {withCredentials: true
        }) as Observable<any>;
    }

    deleteBoard(idb: number, idw: number){
     return this.http.post(this.endpoint + 'api/deleteBoard', {
            idWorkEnv: idw,
            idBoard: idb,
        }, {withCredentials: true
        }) as Observable<any>;
    }

    undeleteBoard(idb: number, idw: number){
        return this.http.post(this.endpoint + 'api/undeleteBoard', {
               idWorkEnv: idw,
               idBoard: idb,
           }, {withCredentials: true
           }) as Observable<any>;
       }

    getLists(idb: number){
        return this.http.post(this.endpoint + 'api/getListsDetails', {
            idBoard: idb
        }, {withCredentials: true
        }) as Observable<any>;

    }

}