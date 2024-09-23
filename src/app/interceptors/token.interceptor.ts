import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // La cookie JWT se enviará automáticamente con cada solicitud
        // No necesitamos modificar la solicitud aquí
        request = request.clone({
            withCredentials: true
          });
        return next.handle(request);
    }
}
