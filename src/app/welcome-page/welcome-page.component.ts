import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * @component
 * 
 * The WelcomePageComponent is the landing page of the application. It provides the functionality
 * to open dialogs for user registration and login.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  
  /**
   * Creates an instance of the WelcomePageComponent.
   * 
   * @param {MatDialog} dialog - The Angular Material Dialog service to open modals for user registration and login.
   */
  constructor(public dialog: MatDialog) { }
  
  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * Currently, it doesn't contain any logic but is implemented for future use if needed.
   */
  ngOnInit(): void { }
  
  /**
   * Opens the user registration dialog when called. It opens the UserRegistrationFormComponent as a modal.
   * 
   * @function
   * @returns {void}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog when called. It opens the UserLoginFormComponent as a modal.
   * 
   * @function
   * @returns {void}
   */
openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}