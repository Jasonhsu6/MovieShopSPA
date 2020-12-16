import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/shared/models/login';
import { User } from 'src/app/shared/models/User';
import { ApiService } from './api.service';
import { JwtStorageService } from './jwt-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user!: User | null;

  private currentLogedInUserSubject = new BehaviorSubject<User>({} as User);
  public currentLogedInUser = this.currentLogedInUserSubject.asObservable();

  private isUserAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isUserAuthenticated = this.isUserAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService, 
    private jwtStorageService: JwtStorageService,
  ) { }

  //login component will call this one
  login(userLogin: Login): Observable<boolean> {
    return this.apiService.create("account/login", userLogin)
    .pipe(map((response) => {
        if (response) {
          // once we get JWT token from API, angular will save that token in local storage
          this.jwtStorageService.saveToken(response.token)
          // this.decodeJWT()
          this.populateLogedInUserInfo();
          // we should decode the token
          return true;
        } 
        return false;
      })
    );
  }


  private decodeJWT(): User | null {
    const token = this.jwtStorageService.getToken();
    // we need to check token is not null and check the token is not expired
    if (!token || new JwtHelperService().isTokenExpired(token)) {
      return null;
    }
    // decode the token and create the User Object
    const decodedToken = new JwtHelperService().decodeToken(token);
    // console.log(decodedToken);
    this.user = decodedToken;
    return this.user;
  }

  public populateLogedInUserInfo() {
    if(this.jwtStorageService.getToken()){
      const token = this.jwtStorageService.getToken();
      const decodedToken = this.decodeJWT();
      this.currentLogedInUserSubject.next(decodedToken);
      this.isUserAuthenticatedSubject.next(true);
    }
  }

    //register component will call this one
  register() {
  
  }
  //from header component when we click on logout it will call this method
  logout() {
    //destroy the token from local storage
    this.jwtStorageService.destroyToken();
    //set current user subject to empty object
    this.currentLogedInUserSubject.next({} as User);
    this.isUserAuthenticatedSubject.next(false);
  }
}
