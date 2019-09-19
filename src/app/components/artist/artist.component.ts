import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {

  artist: any = {};
  albums: any[];
  loadingArtist: boolean;
  loadingAlbum: boolean;

  constructor( private router: ActivatedRoute,
    private spotify: SpotifyService,
    private router2: Router ) {

      this.loadingArtist = true;

      this.router.params.subscribe( params => {

        this.getArtist( params['id'] );
        this.getAlbums(params['id']);
      });
     }


  getArtist( id: string ) {

    this.loadingArtist = true;

    this.spotify.getArtist( id )
          .subscribe( artist => {
            console.log(artist);
            this.artist = artist;

            this.loadingArtist = false;
          });
  }

  getAlbums( id: string ) {
    this.loadingAlbum = true;

    this.spotify.getAlbums( id )
    .subscribe( album => {
      console.log(album);
      this.albums = album;
      this.loadingAlbum = false;
    });
  }

  showAlbum( item: any ) {
    let albumId;

    if ( item.type === 'album' ) {
      albumId = item.id;
    } else {
      albumId = item.albums[0].id;
    }
    
    this.router2.navigate([ '/album', albumId  ]);
  }

}
