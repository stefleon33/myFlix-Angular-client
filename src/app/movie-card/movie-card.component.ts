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
  favorites: any [] = [];

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
        this.favorites = resp.user.FavoriteMovies;
      } else {
        this.favorites= []
      }
    },
    (error: any) => {
      console.error('Error fetching user data:', error);
      this.favorites = [];
    });
  }

    } else {
      this.fetchApiData.addUserFavoriteMovies(user.id, movie.Title).subscribe(res => {
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