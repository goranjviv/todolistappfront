import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpEvent,
    HttpHandler
 } from "@angular/common/http";
import { UserService } from "./user.service";
import { Observable } from "rxjs";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    
    constructor(public userService: UserService) {}
    
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler): Observable<HttpEvent<any>> 
    {
        const serviceurl: string = 'http://localhost:8000/api';
        let request = req.clone({
            url: serviceurl + req.url,
            setHeaders: {
                //ovo mogu da uklonim jer jwtInterceptor ovo odradjuje
                //Authorization: `Bearer ${this.userService.token}`,
                ContentType: 'application/json',
                Accept: 'application/json',
            }
        });

        return next.handle(request);
    }
    

}
