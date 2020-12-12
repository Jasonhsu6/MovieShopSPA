import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/shared/models/login';
import { ApiService } from './api.service';
import { JwtStorageService } from './jwt-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private apiService: ApiService, 
    private jwtStorageService: JwtStorageService
  ) { }

  //login component will call this one
  login(userLogin: Login): Observable<boolean> {
    return this.apiService.create("account/login", userLogin)
    .pipe(map((response) => {
        if (response) {
          // once we get JWT 
          this.jwtStorageService.saveToken(response.token)
          return true;
        } 
        return false;
      })
    );
  }
  //register component will call this one
  register() {
    
  }
  //from header component when we click on logout it will call this method
  logout() {

  }
}
