import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api33-c32ceac54882.herokuapp.com/';

/**
 * @class FetchApiDataService
 * @description
 * Service for interacting with the movie API. This service provides methods for user registration, login, 
 * fetching movies, managing favorite movies, and editing user profiles.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   * Creates an instance of the FetchApiDataService.
   * 
   * @param {HttpClient} http - The HttpClient service to make HTTP requests.
    */
  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves the authentication token from local storage.
   * 
   * @returns {string} The stored JWT token, or an empty string if no token is found.
   */  
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

 /**
   * Registers a new user.
   * 
   * @param {any} userDetails - The user details to be registered.
   * @returns {Observable<any>} An observable of the response from the API.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  
  /**
   * Logs in an existing user.
   * 
   * @param {any} userDetails - The login details (e.g., username and password).
   * @returns {Observable<any>} An observable of the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Retrieves a list of all movies.
   * 
   * @returns {Observable<any>} An observable of the response containing the list of movies.
   */
  public getAllMovies(): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single movie by its ID.
   * 
   * @param {string} movieId - The ID of the movie to retrieve.
   * @returns {Observable<any>} An observable of the movie data.
   */
  public getMovie(movieId: String): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves information about a movie's director by name.
   * 
   * @param {string} movieDirector - The name of the movie director.
   * @returns {Observable<any>} An observable of the director data.
   */  
  public getMovieDirector(movieDirector: String): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/director/' + movieDirector, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 
  
  /**
   * Retrieves information about a movie's genre by name.
   * 
   * @param {string} movieGenre - The name of the movie genre.
   * @returns {Observable<any>} An observable of the genre data.
   */  
  public getMovieGenre(movieGenre: String): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/Genre/' + movieGenre, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }  

  /**
   * Retrieves the current user's profile data.
   * 
   * @returns {Observable<any>} An observable of the user data.
   */  
  public getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem("token");
    console.log('Type of Username:', typeof user.Username);
    console.log('User:', user);
    console.log('Token:', token);

    return this.http.get(apiUrl + "users/" + user.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 
  
  /**
   * Retrieves a list of the current user's favorite movies.
   * 
   * @returns {Observable<any>} An observable of the user's favorite movies.
   */  
  public getFavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = this.getToken();
    return this.http.get(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  } 

  /**
   * Adds a movie to the user's list of favorite movies.
   * 
   * @param {string} Username - The username of the current user.
   * @param {string} movieId - The ID of the movie to be added to favorites.
   * @returns {Observable<any>} An observable of the response.
   */  
  public addFavoriteMovie(Username: String, movieId: String): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = this.getToken();
    user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  /**
   * Checks if a movie is in the user's list of favorite movies.
   * 
   * @param {string} movieId - The ID of the movie to check.
   * @returns {boolean} True if the movie is a favorite, false otherwise.
   */
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieId) >= 0;
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   * 
   * @param {string} Username - The username of the current user.
   * @param {string} movieId - The ID of the movie to be removed from favorites.
   * @returns {Observable<any>} An observable of the response.
   */  
  public deleteFavoriteMovie(Username: String, movieId: String): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = this.getToken();
    const index = user.FavoriteMovies.indexOf(movieId);
    if (index > -1) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Edits the current user's profile data.
   * 
   * @param {any} updatedUser - The updated user data.
   * @returns {Observable<any>} An observable of the response from the API.
   */  
  public editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = this.getToken();
    return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 

  /**
   * Deletes the current user's account.
   * 
   * @returns {Observable<any>} An observable of the response from the API.
   */  
  public deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = this.getToken();
    return this.http.delete(apiUrl + 'users/' + user.Username , {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }  

/**
 * Handles HTTP errors by logging them and throwing a user-friendly message.
 * 
 * @param error The error response object from an HTTP request
 * @returns A user-friendly error message
 */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }

    return throwError(
    'Something bad happened; please try again later.');
  }

/**
 * Extracts the response data from an HTTP request.
 * If no data is found, an empty object is returned.
 *
 * @param res The response object from an HTTP request
 * @returns The response data or an empty object
 */  
private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }
}