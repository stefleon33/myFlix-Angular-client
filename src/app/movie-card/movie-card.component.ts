// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
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

  modifyFavoriteMovies(movie: any): void {
    let user = JSON.parse(localStorage.getItem("user") || "" ); 
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    if (user.favoriteMovies.includes(movie._id)) {
      this.fetchApiData.deleteUserFavoriteMovies(user.id, movie.title).subscribe(res => {
        icon?.setAttribute("fontIcon", "favorite_border");
        
        user.favoriteMovies = res.favoriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
        this.snackBar.open(`Movie removed from favorties`, 'OK', {
          duration: 2000
        });
      }, err => {
        console.error(err)
      })
    } else {
      this.fetchApiData.addUserFavoriteMovies(user.id, movie.title).subscribe(res => {
        icon?.setAttribute("fontIcon", "favorite_border");
        
        user.favoriteMovies = res.favoriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
        this.snackBar.open(`Movie added to favorties`, 'OK', {
          duration: 2000
        });
      }, err => {
        console.error(err)
    })
  }
    localStorage.setItem("user", JSON.stringify(user));
  }

  redirectProfile(): void {
    this.router.navigate(["profile"]);
  }

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }
}