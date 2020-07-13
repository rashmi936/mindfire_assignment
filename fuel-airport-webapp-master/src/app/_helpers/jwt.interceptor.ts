import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AccountService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        // const isLoggedIn = 
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (localStorage.getItem('access_token')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
        }else{
            request = request.clone({
                setHeaders: {
                    client_secret: `ZTJOc2FXVnVkRWxrT2lJaUxDQnVZVzFsT2lKbGNHbGpaMlZ0Y3kxaFpHMXBiaUo5OmUyTnNhV1Z1ZEVsa09pSWlMQ0J1WVcxbE9pSmxjR2xqWjJWdGN5MWhaRzFwYmlKOQ==`
                }
            });
        }

        return next.handle(request);
    }
}