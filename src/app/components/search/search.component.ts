import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  artists: any[] = [];
  loading: boolean;
  searching: boolean;

  constructor( private spotify: SpotifyService ) { }

    searchMusic(term: string) {
    console.log(term);
    this.loading = true;
    if (term == "") {   // avoids loading animation to run when input form is empty
      this.loading = false;
    }
    if (term != "") {   // avoids error when passing query= nothing
      this.spotify.getArtists(term)
        .subscribe( (res: any) => {
          console.log(res);
          this.artists = res;
          this.loading = false;
          this.searching = true;
        });
    }
  }

}
