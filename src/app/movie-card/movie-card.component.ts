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
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
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
}