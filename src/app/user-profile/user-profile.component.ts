import { Component, OnInit } from '@angular/core';
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
  userData: any = {};
  favoriteMovies: any[] = [];
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
    this.fetchApiData.getUser(this.userData.Username).subscribe((res: any) => {
      this.userData={
        ...res,
        id: res._id,
        Username: this.userData.Username, 
        email: this.userData.Email, 
        birthday: this.userData.birthday,
        token: this.userData.token}
      
 localStorage.setItem("user", JSON.stringify(this.userData));
      this.getFavoriteMovies();  
});
}

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


}
