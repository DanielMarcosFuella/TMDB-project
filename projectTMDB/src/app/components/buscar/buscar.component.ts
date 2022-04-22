import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router'; // Para saber cual es la ruta activa (necesitamos recibir un param)

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  buscar: string = '';

  constructor(public ps: PeliculasService,
              private router: ActivatedRoute) {

    this.router.params.subscribe( params => {
      console.log(params);
      // Si viene el texto
      if (params['texto']) {
        this.buscar = params['texto'];
        this.buscarPelicula();
      }
    });
  }

  ngOnInit(): void {
  }

  buscarPelicula() {

    if (this.buscar.length === 0) {
      return;
    }

    this.ps.buscarPelicula(this.buscar)
    .subscribe();
  }

}