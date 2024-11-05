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


}
