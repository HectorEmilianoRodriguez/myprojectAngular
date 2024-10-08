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

    newList(idb: number, nameL: string, descL: string, colorL: string){

        return this.http.post(this.endpoint + 'api/createList', {            
            idBoard: idb,
            nameL: nameL,
            descriptionL: descL,
            colorL: colorL
        }, {withCredentials: true}) as Observable<any>;

    }

    updateList(idb: number, nameL: string, descL: string, colorL: string, idList: number){

        return this.http.put(this.endpoint + 'api/updateList', {            
            idBoard: idb,
            nameL: nameL,
            descriptionL: descL,
            colorL: colorL,
            idList: idList
        }, {withCredentials: true}) as Observable<any>;
            
    }

    deleteList(idList: number){
        return this.http.post(this.endpoint + 'api/deleteList', {
            idList: idList
        }, {withCredentials: true});
    }

    getActivityLabel(idc: number){
        return this.http.post(this.endpoint + 'api/getActivityLabels', {
            idCard: idc
        }, {withCredentials: true}) as Observable<any>;
    }

    newCard(namec: string, end: string, desc: string, important: number, idl: number){
        return this.http.post(this.endpoint + 'api/newCard', {
            nameC: namec,
            end_date: end,
            descriptionC: desc,
            important: important,
            idList: idl
        }, {withCredentials: true}) as Observable<any>;

    }

    updateCard(namec: string, end: string, desc: string, important: number, idc: number){
        return this.http.put(this.endpoint + 'api/updateCard', {
            nameC: namec,
            end_date: end,
            descriptionC: desc,
            important: important,
            idCard: idc,
        }, {withCredentials: true}) as Observable<any>;
    }

    deleteCard(idc: number){
        return this.http.post(this.endpoint + 'api/deleteCard', {
            idCard: idc
        }, {withCredentials: true}) as Observable<any>;
    }

    newLabel(){

    }

    getPossibleLabels(idlb: []){
        return this.http.post(this.endpoint + 'api/getPossibleLabelsForActivity', {
            idLabels: idlb
        }, {withCredentials: true}) as Observable<any>;
    }

    storeCardLabels(idc, idlb: number[]){
        return this.http.post(this.endpoint + 'api/storeCardLabels', {
            idCard: idc,
            idLabels: idlb
        }, {withCredentials: true}) as Observable<any>;
    }

    deleteLabelAct(idc, idl){
        return this.http.post(this.endpoint + 'api/removeLabelFromAct', {
            idCard: idc,
            idLabel: idl
        }, {withCredentials: true}) as Observable<any>;
    }

    getPossibleMembers(idus, idw){
        return this.http.post(this.endpoint + 'api/getPossibleMembersByCard', {
            idWorkEnv: idw,
            idUsers: idus
        }, {withCredentials: true}) as Observable<any>;
    }

    storeCardMembers(idc, idlb: number[]){
        return this.http.post(this.endpoint + 'api/storeCardMembers', {
            idCard: idc,
            idUsers: idlb
        }, {withCredentials: true}) as Observable<any>;
    }

    deleteMemberAct(idc, idu){
        return this.http.post(this.endpoint + 'api/DeleteMemberByCard', {
            idJoinUserWork: idu,
            idCard: idc
        }, {withCredentials: true}) as Observable<any>;
    }

    
    uploadEvidence(formData: FormData): Observable<any> {
        return this.http.post(this.endpoint + 'api/storageEvidence', formData, {
        withCredentials: true
        }) as Observable<any>;
    }

    downloadEvidence(idCard: string): Observable<Blob> {
        return this.http.get(`${this.endpoint}api/downloadEvidence/${idCard}`, {
            withCredentials: true,
            responseType: 'blob' 
        }) as Observable<Blob>;
    }

    endCard(idc, idu: number [], namec, nameu){
        return this.http.post(this.endpoint + 'api/endCard', {
            idCard: idc,
            idUsers: idu,
            nameC: namec,
            name: nameu
        }, {
            withCredentials: true
            }) as Observable<any>;
    }

    approbeCard(idc, idu: number [], namec, nameu){
        return this.http.post(this.endpoint + 'api/approbeCard', {
            idCard: idc,
            idUsers: idu,
            nameC: namec,
            name: nameu
        }, {
            withCredentials: true
            }) as Observable<any>;
    }
    
    desapprobeCard(idc, idu: number [], namec, nameu){
        return this.http.post(this.endpoint + 'api/desapprobeCard', {
            idCard: idc,
            idUsers: idu,
            nameC: namec,
            name: nameu
        }, {
            withCredentials: true
            }) as Observable<any>;
    }

    getComments(idw, idc){
        return this.http.post(this.endpoint + 'api/getComments', {
            idCard: idc,
            idWorkEnv: idw,
        }, {
            withCredentials: true
            }) as Observable<any>;
    }

    deleteComment(idc){
        return this.http.post(this.endpoint + 'api/deleteComment', {
            idComment: idc,
        }, {
            withCredentials: true
            }) as Observable<any>;
    }

    newComment(idj, idc, txt){
        return this.http.post(this.endpoint + 'api/newComment', {
            idCard: idc,
            idJoinUserWork: idj,
            text: txt
        }, {
            withCredentials: true
            }) as Observable<any>;
    }
}