import ProductoModel from "../model/producto";

export const getProducto = async (id?: number) => {
  try {
    return id
      ? ProductoModel.getProducto(id) ?? []
      : ProductoModel.getProductos() ?? [];
  } catch (err) {
    console.log(err);
  }
};


export const deleteProducto = async (id) => {
  try {
    const deletedProducto = await ProductoModel.deleteProducto(id);
    return deletedProducto;
  } catch (err) {
    console.log(err);
  }
};

export const addProducto = async (producto) => {
  try {
    const newProduct = await ProductoModel.addProducto(producto);
    return newProduct;
  } catch (err) {
    console.log(err);
  }
};


export const updateProducto = async (id: string, producto) => {
  try {
    const newProduct = await ProductoModel.updateProducto(id,producto);
    return newProduct;
  } catch (err) {
    console.log(err);
  }
};
