import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { AuthUser } from '../_models/authUser';
import { Observable, observable } from 'rxjs';

@Injectable()
export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    userToken: any;
    decodedToken: any;
    currentUser: User;

    constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {}

    login(model: any) {
        return this.http.post<AuthUser>(this.baseUrl + 'login', model, { headers: new HttpHeaders()
            .set('Content-Type', 'application/json')})
            .pipe(
                map((user) => {
                    if (user) {
                        localStorage.setItem('token', user.tokenString);
                        localStorage.setItem('user', JSON.stringify(user.user));
                        this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
                        this.currentUser = user.user;
                        this.userToken = this.userToken;
                    }
                })
            );
    }

    register(user: User) {
        return this.http.post(this.baseUrl + 'register', user, { headers: new HttpHeaders()
            .set('Content-Type', 'application/json')});
    }

    loggedIn() {
        const token = this.jwtHelperService.tokenGetter();

        if (!token) {
            return false;
        }
        return !this.jwtHelperService.isTokenExpired(token);
    }

    private handleError(error: any) {
        const applicationError = error.headers.get('Application-Error');
        if (applicationError) {
            return Observable.throw(applicationError);
        }
        const serverError = error.json();
        let modelStateErrors = '' ;

        if (serverError) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }

        return Observable.throw(
            modelStateErrors || 'Server Error'
        );
    }

}
