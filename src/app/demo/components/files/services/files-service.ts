import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';


@Injectable({
  providedIn: 'root'

})

export class fileService{

    endpoint = environment.URL_BACK;
    constructor(private http: HttpClient){

    }
    newFolder(name, idj){
        return this.http.post(this.endpoint + 'api/newFolder', {
            nameF: name,
            idJoinUserWork: idj
        }, {withCredentials: true}) as Observable<any>;
    }
    getFolders(idw){
        return this.http.get(this.endpoint + `api/getFolders/${idw}`, {withCredentials: true}) as Observable<any>;
    }

    editFolder(name, idf){
        return this.http.post(this.endpoint + 'api/editFolder', {
            nameF: name,
            idFolder: idf
        }, {withCredentials: true}) as Observable<any>;
    }

    deleteFolder(idf){
        return this.http.post(this.endpoint + 'api/deleteFolder', {
            idFolder: idf
        }, {withCredentials: true}) as Observable<any>;
    }

    getMembersShare(idw, idfolder){
        return this.http.post(this.endpoint + `api/getMembersShareFile`, {
            idWorkEnv: idw,
            idFolder: idfolder
        }, {withCredentials: true}) as Observable<any>;
    }

    shareFolder(idJoinUserWorks: number[], idf){
        return this.http.post(this.endpoint + 'api/shareFile', {
            idJoinUserWorks: idJoinUserWorks,
            idFolder: idf
        }, {withCredentials: true}) as Observable<any>;
    }

    getMembersSharedFile(idwork, idfol){
        return this.http.get(this.endpoint + `api/getMembersSharedFile/${idwork}/${idfol}`, {withCredentials: true} ) as Observable<any>;;
    }

    removeShare(idf, idj){
        return this.http.post(this.endpoint + 'api/removeShare',{
            idFolder: idf,
            idJoinUserWork: idj
        }, {withCredentials: true}) as Observable<any>;
    }

    getFolderInfo(idj, idf){
        return this.http.get(this.endpoint + `api/getFolderInfo/${idf}/${idj}`, {withCredentials: true} ) as Observable<any>;;

    }

    uploadFile(form: FormData) {
        return this.http.post(this.endpoint + 'api/uploadFile', form, { withCredentials: true }) as Observable<any>;
    }

    getFiles(idf){
        return this.http.post(this.endpoint + `api/getFilesByFolder`, {
            idFolder: idf
        },{withCredentials: true} ) as Observable<any>;;
    }
    
    downloadFile(link: string): Observable<Blob> {
        return this.http.get(link, { withCredentials: true, responseType: 'blob' }) as Observable<Blob>;
    }
    
    deleteFile(idFile){
        return this.http.get(this.endpoint + `api/deleteFile/${idFile}`, { withCredentials: true }) as Observable<any>;
    }



}

