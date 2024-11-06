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
  favoriteMovies: any [] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  //Function to get all movies using FetchApiDataService
  getMovies(): void {
    this.fetchApiData
      .getAllMovies()
      .subscribe((resp: any) => {
        this.movies = resp;
        return this.movies;
    });
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

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      if (resp.user && resp.user.FavoriteMovies) {
        this.favoriteMovies = resp.user.FavoriteMovies;
      } else {
        this.favoriteMovies= []
      }
    },
    (error: any) => {
      console.error('Error fetching user data:', error);
      this.favoriteMovies = [];
    });
  }

addToFavorites(movieId: string): void {
  const userObject = JSON.parse(localStorage.getItem("user") || "{}");
  const username = userObject.Username;
  const token = localStorage.getItem("token");

    console.log(username);
    console.log(movieId);
    console.log("Adding to favorites:", movieId);

  if (username && token) {
    this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(
      (response) => {
        console.log("Successfully added to favorites:", response);
          this.snackBar.open("Movie added to favorites", "OK", {
            duration: 2000,
          });
          this.getFavorites();
        },
        (error) => {
          console.error("Failed to add movie to favorites:", error);
          this.snackBar.open("Failed to add movie to favorites", "OK", {
            duration: 2000,
          });
        }
      );
    } else {
      console.log("User data (username or token) is missing or undefined");
    }
  }
  


  removeFromFavorites(movieId: string): void {
    const userObject = JSON.parse(localStorage.getItem("user") || "{}");
    const username = userObject.Username;
    const token = localStorage.getItem("token");

      console.log(username);
      console.log(movieId);
      console.log("Removing from favorites:", movieId);

    if (username && token) {
      this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe(
        (response) => {
          console.log("Successfully removed from favorites:", response);
            this.snackBar.open("Movie removed from favorites", "OK", {
              duration: 2000,
            });
          this.favoriteMovies = this.favoriteMovies.filter(movie => movie._id !== movieId);
          },
          (error) => {
            console.error("Failed to remove movie from favorites:", error);
            this.snackBar.open("Failed to remove movie from favorites", "OK", {
              duration: 2000,
            });
          }
        );
      } else {
        console.log("User data (username or token) is missing or undefined");
      }
  }
  
  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  redirectProfile(): void {
    this.router.navigate(["profile"]);
  }

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }
}