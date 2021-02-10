import express,  { Application } from 'express';
import productoRutas from './routes/producto';
import vistasRoutes from './routes/vistas';
import handlebars from 'express-handlebars';


const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})); //Para interpretar los objectos recibidos y que no sean solo cadenas

const PORT: number = 8080;

const server= app.listen(PORT, () => {
    console.log("Se inicio el servidor correctamente");
}).on("error", error => console.log(`Se produjo un error al iniciar el servidor ${error}`));


app.engine(
    "hbs",  //nombre referencia a la plantilla (se usa luego en set)
    handlebars({ //funcion de configuracion handlebars
        extname: ".hbs", // Extension a utilizar en lugar de .handlebars(por defecto)
        defaultLayout: 'index.hbs', //plantilla principal
        layoutsDir: __dirname + '/views/layouts', // ruta a la plantilla principal
        partialsDir: __dirname + '/views/partials/', //ruta a las plantillas parciales
    })
);

//Establecemos el motor de plantillas que se utiliza
app.set("view engine","hbs");
//Establecemos directorio donde se encuentran los archivos de plantilla
app.set("views","./views");

app.use('/styles',express.static(__dirname + '/public/styles'));

//Cargar rutas 
app.use('/api',productoRutas);
app.use('/',vistasRoutes);
app.use((req,res,next) => {
    res.status(404).send("Error al obtener metodo");
});   


