import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ArtistComponent } from './components/artist/artist.component';
import { SearchComponent } from './components/search/search.component';
import { AlbumComponent } from './components/album/album.component';

export const ROUTES: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'artists/:id', component: ArtistComponent },
  { path: 'search', component: SearchComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
