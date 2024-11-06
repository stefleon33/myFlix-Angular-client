import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  
  @Input() userData: any = { Username: '', Password: '', Email: '', Birthday: '', favoriteMovies: []};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar:MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      const birthday = new Date(this.user.Birthday)
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email; 
      this.userData.Birthday = birthday.toISOString().split('T')[0];

      this.fetchApiData.getAllMovies().subscribe((response: any) =>{
        this.favoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id))
      })
    })
  }

  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('Username', JSON.stringify(data.Username));

      this.snackBar.open('User profile has been updated', 'OK', {
        duration: 2000
      });
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure?')) {
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      })
       this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account', 'OK', {
          duration: 2000
        });
      });
    }
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res:any) => {
      this.favoriteMovies = res.filter((movieId: any) => {
        return this.user.FavoriteMovies.includes(movieId)
      })
      }, (err: any) => {
        console.error(err);
      })
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


  redirectMovies(): void {
    this.router.navigate(["movies"]);
  }

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

}
