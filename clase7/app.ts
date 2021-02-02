import express,  { Application } from 'express';
import productoRutas from './routes/productos';

const app: Application = express();
app.use(express.json())

const PUERTO = 8080;

//Inicializa server
const server = app.listen(PUERTO, () => {
    console.log(`Servidor inicializado en puerto ${PUERTO}`);
    
})
server.on("error",error => console.log(`Se produjo un error: ${error}`));

//Carga rutas
app.use('/',productoRutas);
app.use((req,res,next) => {
    res.status(404).send("Error al obtener metodo");
});   