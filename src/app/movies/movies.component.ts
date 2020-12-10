import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../core/services/movie.service';
import { Movie } from '../shared/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }
  
  genreId!: number;
  movies: Movie[] = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      if (p) {
        this.genreId = Number(p.get('genreid'));
      } else {
        console.log("p is null");
      }
      console.log(this.genreId);
      // make a call to movie service to get movie details
      this.movieService.getMovieByGenre(this.genreId).subscribe((m) => {
        this.movies = m;
        console.log(this.movies);
      });
    });
  }

}
