import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  // Propiedades
  private apikey: string = '8f781d70654b5a6f2fa69770d1d115a3';
  private urlMoviedb: string = 'https://api.themoviedb.org/3';

  peliculas:any[] = []; //aquí almacenaremos las peliculas segun la opción 

  constructor(private jsonp: HttpClientJsonpModule,
              private http: HttpClient) { }


  getPopulares() {
    let url = `${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, 'JSONP_CALLBACK')
    .pipe(map( res => {
     this.peliculas = res ['results']
     console.log(this.peliculas);
     return res['results'];
    
  }));
  }


  buscarPelicula(texto: string) {
    let url = `${this.urlMoviedb}/search/movie?query=${texto}&sort_by=popularity.desc&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, 'JSONP_CALLBACK')
    .pipe(map( res => {
      this.peliculas = res['results'];
      console.log(this.peliculas);
      return res['results']
    }));  
  }

  getPelicula(id: string) {
    let url = `${this.urlMoviedb}/movie/${id}?api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, 'JSONP_CALLBACK')
    .pipe(map( res => res));
  }
}
