import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  favTracks: any[];
  favorites: any[] = [];
  favs: any[];

  constructor(private router: Router,
    private spotify: SpotifyService,
    private router2: ActivatedRoute) {

      this.router2.params.subscribe(params => {
        this.getTrack(params['id']);
      });
  }


  ngOnInit() {
    this.login();
    // get favorites from localStorage
    this.favTracks = JSON.parse((localStorage.getItem("favorites")));
    console.log(this.favTracks);
    this.tracksGetter();
    for(let item of this.favorites){
      console.log("Favs: " + item.name);
    }
  }

  login() {
    const currentUrl = this.router.url.split('access_token=')[1];
    const token: string = currentUrl ? currentUrl.split('&')[0] : null;
    if (token) {
      localStorage.setItem('auth', token);
      setInterval(() => {
        this.spotify.refreshToken();
      }, 3000000);
    } else {
      this.spotify.auth();
    }
  }

  //new
  tracksGetter() {
    for (let item of this.favTracks) {
      console.log("hola: " + item);
      this.favorites.push(this.spotify.getTrack(item));
      console.log("favorites: " + this.favorites)
    }
  }


  getTrack(id: string) {
    this.spotify.getTrack(id)
      .subscribe(track => {
        this.favs = track;
        console.log(this.favs);
      })
  }



}
