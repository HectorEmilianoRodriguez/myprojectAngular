import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class AuthService {


    private url = environment.URL_BACK;
    private isAuthenticated = false;

    constructor(private http: HttpClient,private router: Router) { }


    postLogin(data): Observable<any> {
        return this.http.post(this.url + `api/login`, data, { withCredentials: true }).pipe(
            tap(() => {
               

                this.router.navigate(['/Dash'])
                

            })
        );
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            await this.http.get(this.url + 'api/user', { withCredentials: true }).toPromise();
            return true;
        } catch (error) {
            console.log('Error al verificar la autenticación:', error);
            return false;
        }
    }
    
    

    logout(): Observable<any> {
    
            // Luego, hacemos la solicitud de logout
         //   
               return this.http.post(`${this.url}api/logout`, {}, { withCredentials: true }).pipe(
                  tap(() => {
                       
                        // Limpiar cualquier token o estado almacenado localmente
                    }),
                    catchError(this.handleError)
                );   
      //
    }
    

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Algo salió mal. Por favor, inténtelo de nuevo más tarde.'));
    }
}