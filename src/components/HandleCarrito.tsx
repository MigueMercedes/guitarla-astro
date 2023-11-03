import { useState, type ChangeEvent, useEffect } from 'react'
import type { OneGuitarra } from '../interfaces/guitarras.interface'
import '../styles/carrito.css'

import { carrito } from '../store/carrito';

interface PropsI {
  actualizarCantidad: (guitarra: OneGuitarra) => void
  eliminarProducto: (id: number) => void
}

export default function HandleCarrito({actualizarCantidad, eliminarProducto}: PropsI) {

  const carritoStore = carrito.get();

  const [total, setTotal] = useState(0)

  useEffect(() => {
    let total = 0
    carritoStore.forEach((producto) => total += (producto.cantidad * producto.precio))
    setTotal(total)
  }, [carrito]);
  
  return (
    <>
      <h1 className="heading">Carrito</h1>

      <div className="contenido">
        <div className="carrito">
          <h2>Artículos</h2>

          {carritoStore?.length === 0
            ? 'Carrito Vació'
            : carritoStore?.map((producto) => (
                <div key={producto.id} className="producto">
                  <div>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      width={250}
                      height={480}
                    />
                  </div>

                  <div>
                    <p className="nombre">{producto.nombre}</p>

                    <div className="cantidad">
                      <p>Cantidad:</p>
                      <select
                        className="select"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          actualizarCantidad({
                            ...producto,
                            id: producto.id,
                            cantidad: Number(e.target.value),
                          })
                        }
                        value={producto.cantidad}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <p className="precio">$ {producto.precio}</p>
                    <p className="subtotal">
                      Subtotal: $
                      <span>{producto.cantidad * producto.precio}</span>
                    </p>
                  </div>

                  <button
                    className="eliminar"
                    type="button"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    X
                  </button>
                </div>
              ))}
        </div>

        <aside className="resumen">
          <h3>Resumen del Pedido</h3>
          <p>Total a pagar: ${total}</p>
        </aside>
      </div>
    </>
  )
}
