import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { BannerComponent } from '../banner/banner.component';
import { MovieServiceService } from '../../../shared/services/movie-service.service';
import { MovieCorouselComponent } from '../../../shared/components/movie-corousel/movie-corousel.component';
import { IVideoContent } from '../../../shared/model/video-content.interface';
import { forkJoin, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [HeaderComponent, BannerComponent, MovieCorouselComponent, CommonModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _authService = inject(AuthService);
  private _movieService = inject(MovieServiceService);
  name: string = '';
  profilePicture: string = '';
  email: string = '';

  bannerDetails$: Observable<any> = new Observable<any>;
  bannerVideo$: Observable<any> = new Observable<any>;


  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this._movieService.getMovies(),
    this._movieService.getTvShows(),
    this._movieService.getRatedMovies(),
    this._movieService.getNowPlayingMovies(),
    this._movieService.getUpcomingMovies(),
    this._movieService.getPopularMovies(),
    this._movieService.getTopRated()
  ];

  ngOnInit(): void {
    try {
      forkJoin(this.sources)
        .pipe(
          map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated]) => {
            this.bannerDetails$ = this._movieService.getBannerDetail(movies.results[0].id);
            this.bannerVideo$ = this._movieService.getBannerVideo(movies.results[0].id)
            return { movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated }
          })
        ).subscribe((res: any) => {
          this.movies = res.movies.results as IVideoContent[];
          this.tvShows = res.tvShows.results as IVideoContent[];
          this.ratedMovies = res.ratedMovies.results as IVideoContent[];
          this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
          this.upcomingMovies = res.upcoming.results as IVideoContent[];
          this.popularMovies = res.popular.results as IVideoContent[];
          this.topRatedMovies = res.topRated.results as IVideoContent[];

        })
    } catch (error: any) {
      console.log(error.message);

    }

  }

  constructor() {
    try {
      const storedUser = sessionStorage.getItem('LoggiedInUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.name = user.name || '';
        this.profilePicture = user.picture || '';
        this.email = user.email || '';
      }
    } catch (error) {
      console.error('Error parsing sessionStorage data:', error);
    }
  }

  signout(): void {
    try {
      sessionStorage.removeItem('LoggiedInUser');
    } catch (error) {
      console.error('Error removing sessionStorage item:', error);
    }
    this._authService.signOut();
  }
}
