export const formatearFecha = (fecha: string): string => {
  const fechaNueva = new Date(fecha);
  return fechaNueva.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
};
