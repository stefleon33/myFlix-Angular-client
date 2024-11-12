import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from  '@angular/router';

/**
 * @component
 * 
 * The UserProfileComponent manages the user's profile page. It allows users to view and edit their personal information,
 * manage their favorite movies, and delete their accounts. It also interacts with the backend API to retrieve and update user data.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  
  /**
   * User object holding the current logged-in user's profile details.
   * 
   * @type {any}
   */
  user: any = {};

  /**
   * Array holding the user's favorite movies.
   * 
   * @type {any[]}
   */
  favoriteMovies: any[] = [];
  
  /**
   * Input property to bind the user data.
   * This object holds the user's profile information that can be edited.
   * 
   * @type {any}
   */
  @Input() userData: any = { Username: '', Password: '', Email: '', Birthday: '', favoriteMovies: []};

  /**
   * Creates an instance of the UserProfileComponent.
   * 
   * @param {FetchApiDataService} fetchApiData - Service to fetch API data related to the user.
   * @param {MatSnackBar} snackBar - Service to show snack bar notifications to the user.
   * @param {Router} router - Service to navigate between routes.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar:MatSnackBar,
    public router: Router
  ) { }

  /**
   * Lifecycle hook that runs when the component is initialized.
   * It calls `getUser()` to load user profile data and `getFavoriteMovies()` to retrieve user's favorite movies.
   * 
   */
  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  /**
   * Fetches the user's profile details from the backend API.
   * Also fetches the user's favorite movies by matching movie IDs with the user's data.
   * 
   * @returns {void}
   */
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

  /**
   * Updates the user's profile with the new data entered in the form.
   * It sends the updated data to the backend and shows a notification upon success or failure.
   * 
   * @returns {void}
   */
  editUser(): void {
    // Check if all required fields are filled
    if (!this.userData.Username || !this.userData.Email || !this.userData.Birthday || !this.userData.Password) {
        this.snackBar.open('Please fill in all the required fields.', 'OK', {
        duration: 2000, 
        });
      return;
    }
      // Sends the updated data to the API
      this.fetchApiData.editUser(this.userData).subscribe((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('Username', JSON.stringify(data.Username));

        // Updates local user data
        this.userData = data;

        this.snackBar.open('User profile has been updated', 'OK', {
          duration: 2000
        });
      },
        (error) => {
          console.error('Error updating user:', error);
          this.snackBar.open('Failed to update user profile. Please try again later.', 'OK', {
            duration: 2000,
          });
        }
      );
  }

  /**
   * Deletes the current user's account. If the user confirms, the account is deleted and the user is redirected to the welcome page.
   * 
   * @returns {void}
   */
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

  /**
   * Fetches all movies from the backend API and filters the movies that are marked as favorites by the user.
   * 
   * @returns {void}
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res:any) => {
      this.favoriteMovies = res.filter((movieId: any) => {
        return this.favoriteMovies.includes(movieId)
      })
      }, (err: any) => {
        console.error(err);
      })
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   * Sends the movie ID to the API to remove it from the user's favorites, and updates the list accordingly.
   * 
   * @param {string} movieId - The ID of the movie to be removed from favorites.
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
   * Redirects the user to the movies page.
   * 
   * @returns {void}
   */
  redirectMovies(): void {
    this.router.navigate(["movies"]);
  }

  /**
   * Logs out the user by clearing their session data and redirecting them to the welcome page.
   * 
   * @returns {void}
   */
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

}
