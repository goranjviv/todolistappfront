import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpEvent,
    HttpHandler,
    HttpErrorResponse,
    HttpResponse
 } from "@angular/common/http";
import { UserService } from "./user.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable()
export class FailedRequestInterceptor implements HttpInterceptor {
    
    
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                return next.handle(req);
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    
                }
            }
        }));

    }
    
}
