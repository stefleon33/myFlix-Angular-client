// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog:MatDialog,
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

      let user = JSON.parse(localStorage.getItem("user") || "");
      this.movies.forEach((movie: any) => {
        movie.isFavorite = user.favoriteMovies.includes(movie._id);
      })
      return this.movies;
  }, err => {
    console.error(err)
  })
}

showGenre(movie: any): void {
  this.dialog.open(MessageBoxComponent, {
    data: {
      title: String(movie.Genre.Name),
      content: movie.Genre.Description
    },
    width: "400px"
  })
}

showDirector(movie: any): void {
  this.dialog.open(MessageBoxComponent, {
    data: {
      title: String(movie.Director.Name),
      content: movie.Director.Bio
    },
    width: "400px"
  })
}

showDescription(movie: any): void {
  this.dialog.open(MessageBoxComponent, {
    data: {
      content: movie.Description
    },
    width: "400px"
  })
}

/*
//Function to add to favorites using FetchApiDataService
addToFavorties(movieTitle: string): void {
  const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData
      .addUserFavoriteMovies(user.Username, movieTitle)
      .subscribe((res:any) => {
        console.log(res);
        this.getMovies();
      });
      this.snackBar.open("Movie added to favorites", 'OK', {
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
      this.snackBar.open("Movie removed from favorites", 'OK', {
        duration: 2000
      });
  };
*/
}