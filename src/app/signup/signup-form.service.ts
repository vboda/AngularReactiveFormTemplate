import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError,map, filter} from 'rxjs/operators';
import { ILocation } from 'src/api/location.model';

@Injectable({
  providedIn: 'root'
})
export class SignupFormService {

  private countriesUrl ='http://localhost:3000/location'

  constructor(private http: HttpClient) { }

  getCountries():Observable<ILocation[]>{
    return this.http.get<ILocation[]>(this.countriesUrl)
    .pipe(
      map(data=>data),
      catchError(this.handleError)
    );
  }
  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
