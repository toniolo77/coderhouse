import faker from 'faker';
faker.locale = 'es';



export interface Producto {
    nombre: string;
    precio: number;
    foto: string;
}

const generarProducto = (): Producto => {
    return {
        nombre: faker.commerce.productName(),
        precio: Number(faker.commerce.price()),
        foto: faker.image.imageUrl(),
    }
}

export const getProductos = (cant: number) => {
    const productos : Producto[] =  [];
    for (let i=0; i<cant; i++ ) {
        productos.push(generarProducto());
    }
    return productos;
}