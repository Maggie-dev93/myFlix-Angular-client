import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://movies-flixmcn-ed96d6a64be1.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

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

  // Making the api call for the Get All Movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  // Making the api call for the Get One Movie endpoint
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

 // Making the api call for the Get Director endpoint
getDirector(directorName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/directors/' + directorName, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map((res: any) => this.extractResponseData(res)),
    catchError(this.handleError)
  );
}


  // Making the api call for the Get Genre endpoint
getGenre(genreName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/genres/' + genreName, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map((res: any) => this.extractResponseData(res)),
    catchError(this.handleError)
  );
}


  // Making the api call for the Get User endpoint
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  // Making the api call for the Get Favourite Movies for a user endpoint
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      map((data: any) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  // Making the api call for the Add a Movie to Favourite Movies endpoint
  addFavoriteMovies(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    }).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    );
  }
  

  // Making the api call for the Delete User endpoint
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  // Making the api call for the Delete a Movie to Favourite Movies endpoint
  deleteFavoriteMovies(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieID, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map((res: any) => this.extractResponseData(res)),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
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
}