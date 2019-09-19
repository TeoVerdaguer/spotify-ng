import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {

  albumId: string;
  tracks: any[];

  constructor( private router: ActivatedRoute,
    private spotify: SpotifyService ) { 


      this.router.params.subscribe( params => {
        this.getTracks( params['id'] );
      });
    }


    getTracks( id: string ) {
      console.log(this.albumId);
      this.spotify.getTracks( id )
      .subscribe( track => {
        this.tracks = track;
        console.log(this.tracks);

      })
    }

}
