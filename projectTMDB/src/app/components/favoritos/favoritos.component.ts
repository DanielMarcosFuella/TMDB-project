import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  peliculas: any []
  constructor() { }

  ngOnInit(): void {
    this.getFavorites()
  }

  getFavorites(){
    const storage = localStorage.getItem('peliculas')
    if (storage) {
      this.peliculas = JSON.parse(storage)
    } else {
      this.peliculas = []
    }
  }

}
