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

//treba da hvata neuspele zahteve i reaguje na njih,
//posebno me zanima 401
//(ako token istekne u izmedju provere u angular aplikaciji i provere na serveru)
@Injectable()
export class FailedRequestInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {
            //nek ide dalje, ne zanima me dok je sve ok
            return next.handle(req);
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    //odreagujem na to
                }
            }
        }));

    }
    
}
