import { Component, OnInit, Input } from '@angular/core';

// Import to close the dialog on successful login
import { MatDialogRef } from '@angular/material/dialog';

// Import to make API calls for user authentication
import { FetchApiDataService } from '../fetch-api-data.service';

// Import for displaying notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

/**
 * @component
 * 
 * The UserLoginFormComponent handles user login functionality. It allows users to enter their username and password,
 * sends the login request to the backend API, and handles the response accordingly.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  /**
   * User data object bound to the form inputs. Contains the `Username` and `Password` fields.
   * 
   * @type {Object}
   */
  @Input() userData = { Username: '', Password: '' };
  
  /**
   * Creates an instance of the UserLoginFormComponent.
   * 
   * @param {FetchApiDataService} fetchApiData - Service to interact with the backend API for user login.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Service to close the login dialog on success.
   * @param {MatSnackBar} snackBar - Service to display notification messages to the user.
   * @param {Router} router - Service for navigating between routes (used for redirecting after successful login).
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar,
      private router: Router
  ) { }

  /**
   * Lifecycle hook that runs when the component is initialized.
   * 
   */
  ngOnInit(): void {
    // No specific initialization logic for now.

  }

  /**
   * Sends the user login request to the backend API with the data entered in the form.
   * On successful login, stores the user and token in local storage, closes the login modal, 
   * shows a success notification, and redirects the user to the 'movies' page.
   * 
   * @returns {void}
   */  
  loginUser(): void {
    // Call the login API with user credentials
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      console.log('Login result:', result);

      // Logic for a successful user login
      // Store the user information and token in local storage
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);

      // Close the login modal 
      this.dialogRef.close(); 
      this.snackBar.open(`Login Successful, Hello ${result.user.Username}`, 'OK', {
          duration: 2000
      });

      // Redirect the user to the movies page
      this.router.navigate(['movies']);
      }, (result) => {
        // If there is an error (invalid credentials, etc.), display an error message
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }
  }