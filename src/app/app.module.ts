import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//Angular Material imports
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

// Component imports for different pages in the app
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MessageBoxComponent } from './message-box/message-box.component';

// Route configuration for the app
const appRoutes: Routes = [
 {path: 'welcome', component: WelcomePageComponent },
 {path: 'movies', component: MovieCardComponent },
 {path: 'profile', component: UserProfileComponent },
 {path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    MessageBoxComponent
  ],
  imports: [
    BrowserModule,                    // Core module for browser-based apps
    HttpClientModule,                 // HTTP client for making API calls
    AppRoutingModule,                 // Custom app routing module
    FormsModule,                      // Template-driven forms module
    BrowserAnimationsModule,          // Module for enabling animations
    MatDialogModule,                  // Material dialog module for showing popups
    MatInputModule,                   // Material input fields
    MatButtonModule,                  // Material button module
    MatCardModule,                    // Material card module for displaying content in cards
    MatFormFieldModule,               // Material form field module for input fields with labels
    MatSnackBarModule,                // Material Snackbar module for showing brief messages
    RouterModule.forRoot(appRoutes),  // Set up routes for the app
    MatIconModule                     // Set up routes for the app
  ],
  providers: [
    provideAnimationsAsync()          // Provider for async animations (this is an advanced use case)
  ],
  bootstrap: [AppComponent]           // Bootstrap the main app component
})
export class AppModule { }
