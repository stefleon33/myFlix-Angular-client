import { Component } from '@angular/core';

/**
 * Main application component for the 'myFlix-Angular-client'.
 * 
 * This component is the root component of the Angular app, where the application
 * title is defined and displayed. It serves as the entry point for the app.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /**
   * The title of the application.
   * 
   * This title will be displayed in the application header or elsewhere, depending
   * on how it is used in the template.
   */
  title = 'myFlix-Angular-client';
}
