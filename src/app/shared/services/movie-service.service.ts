import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options = {
  params: {
    inclide_adult: 'true',
    inclide_video: 'true',
    language: 'en_Us',
    page: '1',
    sort_by: 'popurality.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTEwN2U2ZTNhMzY3NjExNGFkNTA1MWE4OGViMTVmOCIsIm5iZiI6MTc0Mzc1MjMyMC4xNSwic3ViIjoiNjdlZjhjODAyZjdkNDM3MDI3OTkzOTBkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.c66UhVspSpYt8Kg-CAoD4IP0p_aCgmvMd39MfSgVZ8A'
  }
};

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  baseUrl = 'https://api.themoviedb.org/3/discover/movie';
  constructor(private _http: HttpClient) { }

  getMovies() {
    return this._http.get<any>(`${this.baseUrl}`, options);
  }

  getTvShows() {
    return this._http.get('https://api.themoviedb.org/3/discover/tv', options)
  }

  getRatedMovies() {
    return this._http.get('https://api.themoviedb.org/3/tv/top_rated', options)
  }

  // getBannerImage(id: number) {
  //   return this._http.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
  // }

  getBannerVideo(id: number) {
    return this._http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this._http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this._http.get('https://api.themoviedb.org/3/movie/now_playing', options)
  }

  getPopularMovies() {
    return this._http.get('https://api.themoviedb.org/3/movie/popular', options)
  }

  getTopRated() {
    return this._http.get('https://api.themoviedb.org/3/movie/top_rated', options)
  }

  getUpcomingMovies() {
    return this._http.get('https://api.themoviedb.org/3/movie/upcoming', options)
  }
}
