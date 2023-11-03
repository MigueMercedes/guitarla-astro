import { atom } from "nanostores";
import type { OneGuitarra } from "../interfaces/guitarras.interface";

export const carrito = atom<OneGuitarra[]>([]);

export function agregarGuitarra(guitarra: OneGuitarra){
  carrito.set([...carrito.get(), guitarra])
}
