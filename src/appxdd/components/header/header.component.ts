import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchStr: string;
  loading: boolean;
  searching: boolean;
  artists: any[] = [];

  constructor() { }
 
  //OLD
  // searchMusic() {
  //   this.loading = true;
  //   console.log(this.searchStr);
  //   if (this.searchStr == "") {   // avoids loading animation to run when input form is empty
  //     this.loading = false;
  //   }
  //   if (this.searchStr != "") {   // avoids error when passing query= nothing
  //     this.spotify.searchMusic(this.searchStr)
  //       .subscribe(res => {
  //         this.searchRes = res;
  //         console.log(res);
  //         this.loading = false;
  //         this.searching = true;
  //         this.artists = res;
  //       });
  //   }
  // }

  // NEW
  // searchMusic(term: string) {
  //   console.log(term);
  //   this.loading = true;
  //   if (term == "") {   // avoids loading animation to run when input form is empty
  //     this.loading = false;
  //   }
  //   if (term != "") {   // avoids error when passing query= nothing
  //     this.spotify.getArtists(term)
  //       .subscribe((res: any) => {
  //         console.log(res);
  //         this.artists = res;
  //         this.loading = false;
  //         this.searching = true;
  //       });
  //   }
  // }

}
