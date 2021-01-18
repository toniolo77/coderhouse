import { resolveModuleName } from "typescript";

const fin = () => console.log("Llamada a callback");

const recorrerTexto = async (texto: string, callback: {(): void}, interval: number = 1000) : Promise<number> => {
    return await new Promise( resolve =>{
        const palabras= texto.split(" ");
        let i = 0;
        const id=  setInterval(() =>{
            if (i< palabras.length) {
                console.log(`${palabras[i++]} `);
            } else {
                callback();
                clearInterval(id);
                resolve(palabras.length);
            }
        },interval);
    })
}

const texto1= "Este es el primer texto";
const texto2= "Este es el segundo texto";
const texto3= "Este es el tercer texto";

recorrerTexto(texto1,fin).then(r1 => {
    recorrerTexto(texto2,fin,500).then(r2 => {
        recorrerTexto(texto3,fin).then(r3 => {
            console.log(`Cantidad letreas ${r1 + r2 + r3} `);
            console.log("Proceso terminado");
        })
    })
});