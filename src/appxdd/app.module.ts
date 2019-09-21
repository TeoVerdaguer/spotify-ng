import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// HttpClient
import { HttpClientModule } from '@angular/common/http';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoadingComponent } from './components/loading/loading.component';
// Routes
import { ROUTES } from './app-routing.module';
// Pipes
import { NoimagePipe } from './pipes/noimage.pipe';
import { DomsanitizerPipe } from './pipes/domsanitizer.pipe';
//Forms
import { FormsModule } from '@angular/forms';
import { ArtistComponent } from './components/artist/artist.component';
import { CardsComponent } from './components/cards/cards.component';
import { SearchComponent } from './components/search/search.component';
import { AlbumComponent } from './components/album/album.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    LoadingComponent,
    NoimagePipe,
    DomsanitizerPipe,
    DomsanitizerPipe,
    ArtistComponent,
    CardsComponent,
    SearchComponent,
    AlbumComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( ROUTES ),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
