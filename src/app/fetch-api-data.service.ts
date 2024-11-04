import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api33-c32ceac54882.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  //Get token from local storage
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  
  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // Making the api call for the get all movies endpoint
  public getAllMovies(): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get one movie endpoint
  public getMovie(movieTitle: String): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/' + movieTitle, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get movie director endpoint
  public getMovieDirector(movieDirector: String): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/director/' + movieDirector, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 
  
  // Making the api call for the get movie genre endpoint
  public getMovieGenre(movieGenre: String): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/Genre/' + movieGenre, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }  

  // Making the api call for the get user endpoint
  public getUser(username: String,): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'users' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 
  
  // Making the api call for the get user favorite movie endpoint
  public getUserFavoriteMovies(username: String, movieTitle: String): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'users/' + username +'movies/' + movieTitle, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 

  // Making the api call for the add user favorite movie endpoint
  public addUserFavoriteMovies(username: String, movieTitle: String): Observable<any> {
    const token = this.getToken();
    return this.http.post(apiUrl + 'users/' + username +'movies/' + movieTitle, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 

  // Making the api call for the delete user favorite movie endpoint
  public deleteUserFavoriteMovies(username: String, movieTitle: String): Observable<any> {
    const token = this.getToken();
    return this.http.delete(apiUrl + 'users/' + username +'movies/' + movieTitle, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the edit user endpoint
  public editUser(username: String, userDetails: any): Observable<any> {
    const token = this.getToken();
    return this.http.put(apiUrl + 'users/' + username, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 

  // Making the api call for the delete user endpoint
  public deleteUser(username: String): Observable<any> {
    const token = this.getToken();
    return this.http.delete(apiUrl + 'users/' + username , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }  

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

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }
}