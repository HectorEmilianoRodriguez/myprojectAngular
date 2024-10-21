import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class waterfallService {

    endpoint = environment.URL_BACK;

   constructor(private http:HttpClient){

   }

   getCards(idBoard){

      return this.http.post(this.endpoint + 'api/getCardsAsc', {
            idBoard: idBoard
      }, {withCredentials: true}) as Observable<any>;
   }


}