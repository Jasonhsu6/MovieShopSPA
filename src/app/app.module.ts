import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GenresComponent } from './genres/genres.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { MovieCardComponent } from './shared/components/movie-card/movie-card.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GenresComponent,
    MoviesComponent,
    HomeComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
