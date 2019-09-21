import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit{

  albumId: string;
  tracks: any[];
  static favorites: any[] = [];
  isFavorite: boolean;
  isActive = false;

  constructor(private router: ActivatedRoute,
    private spotify: SpotifyService) {

    this.router.params.subscribe(params => {
      this.getTracks(params['id']);
    });

    // AlbumComponent.favorites.push(localStorage.getItem("favorites"));
  }

  getTracks(id: string) {
    console.log(this.albumId);
    this.spotify.getTracks(id)
      .subscribe(track => {
        this.tracks = track;
        console.log(this.tracks);
      })
  }

  // NEW

  addToFav(id: string) {
    if (AlbumComponent.favorites.includes(id)) {
      this.removeItem(id);
      this.isFavorite = true;
    } else {
      AlbumComponent.favorites.push(id);
      this.isFavorite = false;
    }

    console.log(AlbumComponent.favorites);
    localStorage.setItem("favorites", JSON.stringify(AlbumComponent.favorites));
  }

  removeItem(itemToRemove) {
    AlbumComponent.favorites.forEach((item, index) => {
      if (item === itemToRemove) {
        AlbumComponent.favorites.splice(index, 1);
      }
    });
  }

  onClick() {
    this.isActive = !this.isActive;
  }

  ngOnInit(){
    //get favorites from local storage
    if (localStorage.getItem("favorites") != null) {
      for (let item in JSON.parse(localStorage.getItem("favorites")).favorites) {
        AlbumComponent.favorites.push(item);
      }
    }
  }

}
