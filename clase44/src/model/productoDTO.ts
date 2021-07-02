export function ProductoDTO(producto) {
  return producto
    ? {
        id: producto?._id ?? producto?.id,
        nombre: producto.nombre,
        timestampt: producto.timestampt,
        descripcion: producto.descripcion,
        foto: producto.foto,
        stock: producto.stock,
        precio: producto.precio,
        codigo: producto.codigo,
        fyh: new Date(),
      }
    : producto;
}
