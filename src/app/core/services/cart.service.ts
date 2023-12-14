import { Injectable } from '@angular/core';
import { ProductoCarrito } from '../interfaces/carrito';
import { Producto } from '../interfaces/poducto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carrito: ProductoCarrito[] = [];
  totalCarrito: number = 0;

  constructor() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    const guardado = localStorage.getItem("carrito");
    if (guardado) {
      this.carrito = JSON.parse(guardado);
      this.calcularTotal();
    }
  }

  agregarAlCarrito(producto: Producto, cantidad: number) {
    const index = this.carrito.findIndex(item => item.producto.nombre === producto.nombre);
    if (index === -1) {
      const productoActual: ProductoCarrito = {
        cantidad: cantidad,
        producto: producto
      };
      this.carrito.push(productoActual);
    } else {
      // Actualiza la cantidad y recalcula el precio total del producto
      this.carrito[index].cantidad += cantidad;
    }

    this.guardarLocalStorage();
    this.calcularTotal(); // Recalcula el precio total del carrito
  }

  eliminarProducto(nombre: string) {
    this.carrito = this.carrito.filter(item => item.producto.nombre !== nombre);
    this.guardarLocalStorage();
    this.calcularTotal();
  }

  vaciarCarrito() {
    this.carrito = [];
    this.guardarLocalStorage();
    this.calcularTotal();
  }

  cambiarCantidad() {
    this.guardarLocalStorage();
    this.calcularTotal();
  }

  guardarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }

  calcularTotal() {
    let subtotal = 0;
    this.carrito.forEach(item => {
      subtotal += item.producto.precio * item.cantidad;
    });
    this.totalCarrito = subtotal;
  }
}
