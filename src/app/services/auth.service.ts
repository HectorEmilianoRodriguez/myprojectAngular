import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private isAuthenticated = false;
    private url = environment.URL_BACK;

    constructor(private http: HttpClient,private router: Router) { }


    postLogin(data): Observable<any> {
        return this.http.post(this.url + `api/login`, data, { withCredentials: true }).pipe(
            tap(() => {
                this.isAuthenticated = true;
            })
        );
    }

    isLoggedIn(): boolean {
        // Aquí podrías implementar una lógica más robusta para verificar la autenticación
        return this.isAuthenticated;
    }

    logout():Observable<any>{
        return this.http.post(this.url + `api/logout`,{ withCredentials: true }).pipe(
            tap(() => {
                this.isAuthenticated = false;
                // Limpiar cualquier token o estado almacenado localmente
            }),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Algo salió mal. Por favor, inténtelo de nuevo más tarde.'));
    }
}