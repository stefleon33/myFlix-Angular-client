import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', favoriteMovies: []};

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
      this.userData.Username = this.user.Username, 
      this.userData.Email = this.user.Email, 
      this.userData.Birthday = this.user.Birthday,

editUser(): void {
  this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe((resp: any) => {
    this.userData = {
      ...resp,
      id: resp._id,
      password: this.userData.password,
      token: this.userData.token
    };
    localStorage.setItem("user", JSON.stringify(this.userData));
    this.snackBar.open(`User profile updated`, 'OK', {
          duration: 2000
        });
});
}
      this.fetchApiData.getAllMovies().subscribe((response: any) =>{
        //this.favoriteMovies = response.filter((m: {_id:any}) => this.user.favoriteMovies.indexOf(m._id) >= 0)
      })
    })
  }

deleteUser(): void {
  this.fetchApiData.deleteUser(this.userData).subscribe((resp: any) => {
    this.userData = {
      ...resp,
      id: resp._id,
      password: this.userData.password,
      token: this.userData.token
    };
    localStorage.setItem("user", JSON.stringify(this.userData));
    console.log(this.userData);
});
} 

getFavoriteMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((res:any) => {
    this.favoriteMovies = res.filter((movie: any) => {
      return this.userData.favoriteMovies.includes(movie._id)
    })
    }, (err: any) => {
      console.error(err);
    });
}

removeFromFavorite(movie: any): void {
    this.fetchApiData.deleteUserFavoriteMovies(this.userData.username, movie.movieTitle).subscribe((res:any) => {
    this.userData.favoriteMovies = res.favoriteMovies;
    this.getFavoriteMovies();
    }, (err: any) => {
      console.error
    });
}

  redirectMovies(): void {
    this.router.navigate(["movies"]);
  }

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

}
