import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  {
    path: "movies/genres/:id", 
    component: MoviesComponent,
  },
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "movies/:id",
    component: HomeComponent,
  },
  {
    path: "movies/genre/:genreid",
    component: MoviesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
