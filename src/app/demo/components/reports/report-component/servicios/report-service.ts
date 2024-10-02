import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'

})
export class ReportService {

    private endpoint = environment.URL_BACK;
    constructor(private http: HttpClient){

    }
    getLabels(idwork: string): Observable<any> {
        return this.http.get(this.endpoint+`api/getLabels/${idwork}`, {withCredentials: true}) as Observable<any>;
    }

    productivity(idwork: string, iduser: number, date1: string, date2:string, labels:number[]){

        return this.http.post(this.endpoint+`api/pdf/ProductivityReport`,{
            idWorkEnv: idwork,
            idUser: iduser,
            date1: date1,
            date2: date2,
            idLabels: labels
        },{withCredentials: true, responseType: 'blob'}) as Observable<Blob>;


    }

    participant(idwork: string, iduser: number, date1: string, date2:string, labels:number[]){
        return this.http.post(this.endpoint+`api/pdf/ParticipantReport`,{
            idWorkEnv: idwork,
            idUser: iduser,
            date1: date1,
            date2: date2,
            idLabels: labels
        },{withCredentials: true, responseType: 'blob'}) as Observable<Blob>;
    }

    deliveryMembers(idwork: string, iduser: number, date1: string, date2:string){
        return this.http.post(this.endpoint+`api/pdf/DeliveryActivitiesReport`, {
            idWorkEnv: idwork,
            iduser: iduser,
            date1: date1,
            date2: date2
        }, {withCredentials: true, responseType: 'blob'}) as Observable<Blob>;

    }

    deliveryCoordinators(idwork: string, iduser: number, date1: string, date2:string){
        return this.http.post(this.endpoint+`api/pdf/DeliveryActivitiesReportCoordinator`, {
            idWorkEnv: idwork,
            iduser: iduser,
            date1: date1,
            date2: date2
        }, {withCredentials: true, responseType: 'blob'}) as Observable<Blob>;
    }

    pendingactivities(idwork: string, date1: string, date2:string, users: number[]){
        return this.http.post(this.endpoint+`api/pdf/PendingActivitiesReport`, {
            idWorkEnv: idwork,
            date1: date1,
            date2: date2,
            idUsers: users
        }, {withCredentials: true, responseType: 'blob'}) as Observable<Blob>;
    }

    completedactivities(idwork: string, date1: string, date2:string, users: number[]){
        return this.http.post(this.endpoint+`api/pdf/CompletedActivitiesReport`, {
            idWorkEnv: idwork,
            date1: date1,
            date2: date2,
            idUsers: users
        }, {withCredentials: true, responseType: 'blob'}) as Observable<Blob>;
    }

}