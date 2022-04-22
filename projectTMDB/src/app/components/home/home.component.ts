import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  populares: any;

  constructor(public ps: PeliculasService) {

    this.ps.getPopulares()
    .subscribe( data => this.populares = data );

  }
  

  ngOnInit(): void {
  }

}
