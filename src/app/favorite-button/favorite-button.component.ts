import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class FavoriteButtonComponent {
  @Input() movieId!: string; // Input property to receive movie ID
  @Input() isFavorite!: boolean; // Input property to determine if the movie is already a favorite

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  toggleFavorite(movieId: string, isFavorite: boolean): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const username = user.Username;

    if (isFavorite) {
      this.fetchApiData.deleteFavoriteMovies(username, movieId).subscribe((res) => {
        console.log('Delete response:', res); // Log the response
        this.snackBar.open('Removed from favorites', 'OK', {
          duration: 2000,
        });
        this.isFavorite = false;
        this.updateUserFavorites(res);
      }, (error) => {
        console.error('Error removing from favorites:', error);
        this.snackBar.open('Failed to remove from favorites', 'OK', {
          duration: 2000,
        });
      });
    } else {
      this.fetchApiData.addFavoriteMovies(username, movieId).subscribe((res) => {
        this.snackBar.open('Added to favorites', 'OK', {
          duration: 2000,
        });
        this.isFavorite = true;
        this.updateUserFavorites(res);
      }, (error) => {
        console.error('Error adding to favorites:', error);
        this.snackBar.open('Failed to add to favorites', 'OK', {
          duration: 2000,
        });
      });
    }
  }

  private updateUserFavorites(user: any): void {
    console.log('Updated user:', user); // Log the updated user object
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
