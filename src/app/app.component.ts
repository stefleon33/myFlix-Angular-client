import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }
  //This is the function that will open the dialog when the signup button is clicked
opensUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
  // Assigning the dialog a width
    width: '480px'
    });
  }
}
