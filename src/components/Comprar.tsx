import type { OneGuitarra } from '../interfaces/guitarras.interface'
import { type GuitarraActual } from '../pages/guitarras/[id].astro'
import { agregarGuitarra, carrito } from '../store/carrito'
import { useState, type ChangeEvent, useEffect, type FormEvent } from 'react'
import Guitarra from './Guitarra.astro'

interface PropsI {
  GuitarraActual: GuitarraActual
}

export default function Comprar({
  GuitarraActual: { nombre, id, imagen, precio },
}: PropsI) {
  const carritoStorage = carrito.get()

  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    console.log(cantidad)
    console.log(carritoStorage)
    const guitarraSeleccionada: OneGuitarra = {
      id: Number(id),
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
    }
    agregarProducto(guitarraSeleccionada)
  }, [cantidad])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (cantidad < 1) {
      alert('Cantidad no válida!')
    }

    const guitarraSeleccionada: OneGuitarra = {
      id: Number(id),
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
    }

    agregarProducto(guitarraSeleccionada)
  }

  const agregarProducto = (guitarra: OneGuitarra) => {
    // if (carritoStorage.get().some((guitarraState: OneGuitarra) => guitarraState.id === guitarra.id)) {
    //   const carritoActualizado = carritoStorage.get().map((guitarraState) => {
    //     if (guitarraState.id === guitarra.id) {
    //       guitarraState.cantidad = guitarra.cantidad
    //     }
    //     return guitarraState
    //   });
    //   carritoStorage.set([...carritoActualizado])
    //   localStorage.setItem('carrito', JSON.stringify(carritoStorage.get()))
    // } else {
    agregarGuitarra(guitarra)
    localStorage.setItem('carrito', JSON.stringify(carritoStorage))
    // }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <label htmlFor="cantidad">Cantidad:</label>
      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setCantidad(Number(e.target.value))
        }
        id="cantidad"
      >
        <option value="0">-- Seleccione --</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <input type="button" value="Agregar al carrito" />
    </form>
  )
}
