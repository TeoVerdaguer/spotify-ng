import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router, private spotify: SpotifyService ) { }


  ngOnInit() {
    this.login();
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


}
