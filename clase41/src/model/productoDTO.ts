export function ProductoDTO(producto) {
  return producto
    ? {
        id: producto?._id ?? producto?.id,
        nombre: producto.nombre,
        codigo: producto.codigo,
        fyh: new Date(),
      }
    : producto;
}
