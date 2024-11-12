// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService  } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @component
 * 
 * The UserRegistrationFormComponent handles the user registration process.
 * It collects user details and sends them to the backend API for registration.
 * If the registration is successful, it closes the modal and shows a notification.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Input property that holds user data for registration.
   * This object is passed to the backend API when the user submits the registration form.
   * 
   * @type {object}
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of the UserRegistrationFormComponent.
   * 
   * @param {FetchApiDataService} fetchApiData - The service responsible for interacting with the backend API.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to close the dialog upon successful registration.
   * @param {MatSnackBar} snackBar - Used for displaying notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }
  /**
   * Lifecycle hook that runs when the component is initialized.
   * Currently, it doesn't contain any logic but can be extended in the future.
   */
  ngOnInit(): void { }

  /**
   * This method sends the user registration data to the backend API.
   * Upon success, the modal is closed and a success message is shown.
   * If the registration fails, an error message is displayed instead.
   * 
   * @function
   * @returns {void}
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(result, 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}