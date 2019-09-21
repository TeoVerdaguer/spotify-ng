import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albumId: string;
  tracks: any[];
  static favorites: any[];
  isFavorite: boolean;
  isActive = false;

  constructor(private router: ActivatedRoute,
    private spotify: SpotifyService) {

    this.router.params.subscribe(params => {
      this.getTracks(params['id']);
    });
  }

  getTracks(id: string) {
    console.log(this.albumId);
    this.spotify.getTracks(id)
      .subscribe(track => {
        this.tracks = track;
        console.log(this.tracks);
      })
  }

  addToFav(id: string) {
    if (AlbumComponent.favorites.includes(id)) {
      this.removeItem(id);
      this.isFavorite = true;
    } else {
      AlbumComponent.favorites.push(id);
      this.isFavorite = false;
    }
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


  ngOnInit() {
    //get favorites from local storage
    if (localStorage.getItem("favorites") === null) {
      AlbumComponent.favorites = [];
      console.log("LS favorites is empty");
    } else {
      console.log("LS favorites is not empty");
      AlbumComponent.favorites = [];
      for (let item of JSON.parse(localStorage.getItem("favorites"))) {
        AlbumComponent.favorites.push(item);
      }
    }
  }

}
