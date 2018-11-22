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
import { Router } from "@angular/router";
import { MessagesService } from "./messages.service";

//treba da hvata neuspele zahteve i reaguje na njih,
//posebno me zanima 401
//(ako token istekne u izmedju provere u angular aplikaciji i provere na serveru)
@Injectable()
export class FailedAuthInterceptor implements HttpInterceptor {
    
    constructor(
        private messagesService: MessagesService,
        private userService: UserService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {
            //nek ide dalje, ne zanima me dok je sve ok
            return next.handle(req);
        }, (err: any) => 
            {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                    this.userService.logout();
                    this.messagesService.clear();
                    this.messagesService.push('Session expired, please login again!');
            }
        }));

    }
    
}
