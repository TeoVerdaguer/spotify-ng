import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  favTracksId: string[] = [];
  favorites: any[];

  tracks: any[] = [];

  constructor(private router: Router,
    private spotify: SpotifyService,
    private router2: ActivatedRoute) {
  }

  ngOnInit() {
    this.login();

    // get favorite tracks IDs from localStorage

    for (let item of JSON.parse((localStorage.getItem("favorites")))) {
      this.favTracksId.push(item);
    }

    for (let i of this.favTracksId) {
      this.router2.params.subscribe(params => {
        this.getTrack(i);
      });
    }

    // saves tracks into 'favorites' array

    // this.tracksGetter();
    // this.seeTracks();
    console.log(this.tracks);
  }

  getTrack(id: string) {
    console.log("FAVTRACKS ID: " + id);
    this.spotify.getTrack(id)
      .subscribe(track => {
        this.tracks.push(track);
      })
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

  tracksGetter() {
    for (let item of this.favTracksId) {
      console.log("item///" + item + "///");
      this.favorites.push(this.spotify.getTrack(item));
      console.log("-------" + this.spotify.getTrack(item));
    }
  }

  //........
  seeTracks() {
    for (let song of this.tracks) {
      // console.log("item-----" + song);
      console.log("LOG---"+JSON.stringify(song, null, 2));
    }
  }

}