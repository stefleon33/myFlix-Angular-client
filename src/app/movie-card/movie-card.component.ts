// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageBoxComponent } from '../message-box/message-box.component';

/**
 * @component
 * 
 * The MovieCardComponent is responsible for displaying a list of movies, showing details such as genres, directors,
 * and descriptions, and managing the user's favorite movies (adding/removing from favorites).
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /** Array holding all movies fetched from the backend */
  movies: any[] = [];

  /** Array holding the user's favorite movies */
  favoriteMovies: any [] = [];

  /**
   * Creates an instance of MovieCardComponent.
   * 
   * @param {FetchApiDataService} fetchApiData - Service to fetch movie data from the backend API.
   * @param {MatDialog} dialog - Service to open dialogs displaying additional information (e.g., genre, director).
   * @param {Router} router - Router service for navigation.
   * @param {MatSnackBar} snackBar - Service to show notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Lifecycle hook that runs when the component is initialized. Fetches the list of movies and the user's favorite movies.
   * 
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Fetches the list of all movies from the backend.
   * 
   * @returns {void}
   */  
  getMovies(): void {
    this.fetchApiData
      .getAllMovies()
      .subscribe((resp: any) => {
        this.movies = resp;
        return this.movies;
    });
  }

  /**
   * Opens a dialog displaying the genre details of the selected movie.
   * 
   * @param {any} movie - The movie whose genre details are to be shown.
   * @returns {void}
   */
  showGenre(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: String(movie.Genre.Name),
        content: movie.Genre.Description
      },
      width: "400px"
    })
  }

  /**
   * Opens a dialog displaying the director's details for the selected movie.
   * 
   * @param {any} movie - The movie whose director details are to be shown.
   * @returns {void}
   */
  showDirector(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: String(movie.Director.Name),
        content: movie.Director.Bio
      },
      width: "400px"
    })
  }
  /**
   * Opens a dialog displaying the full description of the selected movie.
   * 
   * @param {any} movie - The movie whose description is to be shown.
   * @returns {void}
   */
  showDescription(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        content: movie.Description
      },
      width: "400px"
    })
  }

  /**
   * Fetches the user's favorite movies from the backend.
   * If the user has favorites, they are stored in the `favoriteMovies` array.
   * 
   * @returns {void}
   */
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

  /**
   * Adds a movie to the user's favorite movies list by sending a request to the backend.
   * 
   * @param {string} movieId - The ID of the movie to be added to the user's favorites.
   * @returns {void}
   */
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
  
  /**
   * Removes a movie from the user's favorite movies list by sending a request to the backend.
   * 
   * @param {string} movieId - The ID of the movie to be removed from the user's favorites.
   * @returns {void}
   */
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
  /**
   * Checks if a movie is currently in the user's list of favorite movies.
   * 
   * @param {string} movieID - The ID of the movie to check.
   * @returns {boolean} - Returns true if the movie is a favorite, otherwise false.
   */  
  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  /**
   * Navigates the user to their profile page.
   * 
   * @returns {void}
   */
  redirectProfile(): void {
    this.router.navigate(["profile"]);
  }

  /**
   * Logs the user out by clearing their local storage and redirecting them to the welcome page.
   * 
   * @returns {void}
   */
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }
}