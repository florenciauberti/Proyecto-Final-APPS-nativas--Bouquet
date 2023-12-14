import { Producto } from "./poducto"

export interface Categoria{
    id:number
    nombre:string
    fotoUrl: string
    producto: Producto[]
}