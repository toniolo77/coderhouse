import express,  { Application } from 'express';
import productoRutas from './routes/producto';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})); //Para interpretar los objectos recibidos y que no sean solo cadenas

const PORT: number = 8080;

const server= app.listen(PORT, () => {
    console.log("Se inicio el servidor correctamente");
}).on("error", error => console.log(`Se produjo un error al iniciar el servidor ${error}`));

app.use('/cargaProducto',express.static(__dirname + '/public'));

//Cargar rutas 
app.use('/api',productoRutas);
app.use((req,res,next) => {
    res.status(404).send("Error al obtener metodo");
});   


