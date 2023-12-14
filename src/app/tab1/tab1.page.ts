import { Component } from '@angular/core';
import { Categoria } from '../core/interfaces/categoria';
import { CATEGORIA } from '../core/interfaces/constants/categoria';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
/*arrays de string (sirven para saber del error antes de ejecutar)*/
  categorias:Categoria[]= CATEGORIA
}
