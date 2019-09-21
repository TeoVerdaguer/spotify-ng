import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token: string = null;
  private query: string;

  constructor(private http: HttpClient) { }

  // Authorization related methods
  auth() {
    this.token = localStorage.getItem('auth');
    const urlBase = 'https://accounts.spotify.com/authorize';
    const clientId = '1373c8c495b94aec8b9ee6c87e35cb1e';
    const scopes = encodeURIComponent('user-read-private user-read-email');
    const redirectUri = encodeURIComponent('http://localhost:4200/home');
    const url = `${urlBase}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}&show_dialog=true`;
    if (!this.token) {
      window.location.href = url;
    }
  }

  refreshToken() {
    const clientId = '1373c8c495b94aec8b9ee6c87e35cb1e';
    const clientSecret = '563ef5113d3f49d3ab39b208285d7ef9';
    const url = `https://bootcamp-angular.herokuapp.com/spotify/${clientId}/${clientSecret}`;
    this.http.get(url).subscribe((data: any) => {
      localStorage.setItem('auth', data.access_token);
    });
  }

  getUrl(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    this.token = localStorage.getItem('auth');

    const headers = new HttpHeaders({
      Authorization:
        `Bearer ${this.token}`
    });
    return this.http.get(url, { headers });
  }

  // Other methods

  searchMusic(str: string, type = 'artist') {
    this.query = `search?query=${str}&offset=0&limit=20&type=${type}&market=AR`;
    return this.getUrl(this.query).pipe(
      map(data => data["artists"].items));
  }

  getArtists(termino: string) {
    return this.getUrl(`search?q=${termino}&type=artist&limit=20`).pipe(
      map(data => data["artists"].items)
    );
  }

  getArtist(id: string) {
    return this.getUrl(`artists/${id}`);
  }

  getAlbums(id: string) {
    return this.getUrl(`artists/${id}/albums?market=AR`).pipe(
      map(data => data["items"]));
  }

  getTracks (id: string) {
    return this.getUrl(`albums/${id}/tracks`).pipe(
      map(data => data["items"])
      );
  }

  getTrack (id: string) {
    return this.getUrl(`tracks/${id}`).pipe(
      map(data => data["items"])
    );
  }
}
