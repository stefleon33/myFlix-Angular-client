// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from 'express';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar:MatSnackBar,
    public router: Router
  ) { }

ngOnInit(): void {
  this.getMovies();
}

//Function to get all movies using FetchApiDataService
getMovies(): void {
  this.fetchApiData
    .getAllMovies()
    .subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
  });
}

showGenreAlert(genre: any): void {
  alert(genre);
}

showDirectorAlert(director: any): void {
  alert(director);
}

showDescriptionAlert(description: any): void {
  alert(description);
}

//Function to add to favorites using FetchApiDataService
addToFavorties(movieTitle: string): void {
  const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData
      .addUserFavoriteMovies(user.Username, movieTitle)
      .subscribe((res:any) => {
        console.log(res);
        this.getMovies();
      });
      this.snackBar.open("movie added to favorites", 'OK', {
        duration: 2000
      });
  };

//Function to remove favorites using FetchApiDataService
deleteFromFavorties(movieTitle: string): void {
  const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData
      .deleteUserFavoriteMovies(user.Username, movieTitle)
      .subscribe((res:any) => {
        console.log(res);
        this.getMovies();
      });
      this.snackBar.open("movie removed from favorites", 'OK', {
        duration: 2000
      });
  };

}