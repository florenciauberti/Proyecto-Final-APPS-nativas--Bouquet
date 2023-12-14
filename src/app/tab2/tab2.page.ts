import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from '../core/interfaces/perfil';
import { PerfilService } from '../core/services/perfil.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  perfilService = inject(PerfilService);
  router = inject(Router);

  perfil: Perfil = {
    nombre: '',
    mail: '',
    telefono: '',
    direccion: '',
  };

  ngOnInit(): void {
    if (this.perfilService.perfil()) {
      this.perfil = { ...this.perfilService.perfil()! };
    }
  }

  constructor() {}

  guardarDatosPerfil() {
    this.perfilService.guardarDatos(this.perfil);

    // Crea el mensaje para WhatsApp
    const mensaje = this.crearMensaje();

    // Abre una nueva ventana con el mensaje de WhatsApp
    window.open(mensaje, '_blank');

    // Navega de regreso a la página principal
    this.router.navigate(['/']);
  }

  private crearMensaje(): string {
    const parteProductos = '...'; 

    const primeraParte = 'http://wa.me/+543413748849?text=';
    const segundaParte = `Mis datos de envio son:\n- Nombre: ${
      this.perfil.nombre
    }\n- Direccion: ${this.perfil.direccion}\n- Telefono: ${this.perfil.telefono}\n- Mail: ${
      this.perfil.mail
    };\n`;

    return encodeURI(primeraParte + segundaParte);
  }
}
