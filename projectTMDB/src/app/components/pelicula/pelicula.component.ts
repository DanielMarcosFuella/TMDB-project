import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router'; // Para saber cual es la ruta activa (necesitamos recibir un param)
import { Location } from '@angular/common';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {

  pelicula: any;
  regresarA: string = "";
  busqueda: string = "";

  constructor(public ps: PeliculasService,
              // Para obtener los params por el url

              private location: Location,
              private router: ActivatedRoute) {
              

    this.router.params.subscribe( params => {

      console.log(params);
      this.regresarA = params['pag'];

      // Preguntamos si viene el param de busqueda ya que es opcional
      if (params['busqueda']) {
        this.busqueda = params['busqueda'];
      }

      this.ps.getPelicula(params['id'])
      // Nos subscribimos e inicializamos la variable local con la info de la pelicula
      .subscribe( pelicula => {
        console.log(pelicula);
        this.pelicula = pelicula;
      });

    });
  }

  ngOnInit(): void {
  }

  addToFavorite (){
    const storage = localStorage.getItem('peliculas');
    if (storage){
      const peliculas = JSON.parse(storage);
      const existepelicula = peliculas.find(pelicula => {
        if (pelicula.id === this.pelicula.id) {
          return true
        }
      })
      if (existepelicula){
        alert ('La pelicula ya esta en favoritos');
      } else {
        peliculas.push(this.pelicula);
        alert ('Pelicula añadida a favoritos');
      localStorage.setItem('peliculas', JSON.stringify(peliculas));
      }
    } else{
      const peliculas= [];
      peliculas.push(this.pelicula);
      alert ('Pelicula añadida a favoritos');
      localStorage.setItem('peliculas', JSON.stringify(peliculas));
    }
  }

  removeFavorite() {
    const storage = localStorage.getItem('peliculas');
    if (storage) {
      const peliculas = JSON.parse(storage);
      const existepelicula = peliculas.find(pelicula => {
        if (pelicula.id === this.pelicula.id){
          return true
        }
      })
      if (existepelicula){
        let peliculasnew = peliculas.filter((item) => item.id !== this.pelicula.id);

      alert ('Pelicula eliminada de favoritos');
        localStorage.setItem('peliculas', JSON.stringify(peliculasnew));
      }
    }
  }

   goToBack(){
      this.location.back()
  }

}
