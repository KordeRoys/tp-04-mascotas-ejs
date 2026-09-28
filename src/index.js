//1ro! Agregamos la libreria
const express = require("express");
const path = require("node:path");
const expressLayouts = require("express-ejs-layouts");
//2do! Creamos nuestras funciones en Archivos.js
const { leerJson } = require("./archivos.js");//*La funcionescribirJson No se va a utilizar, es solo para pruebas
//3ro! creamos el puerto y lo probamos para ver si funciona con /api/mascotas agregando la ruta de nuestro Json para saber si se muestra
const PORT = 3000;
const rutaDatos = path.join(__dirname, "..", "datos", "mascotas.json");

async function main() {
    //Primero creamos la constante en la que vamos a mostrar las mascotas de n uestro JSON
    const adopcionMascotas = await leerJson(rutaDatos); //agregando en los marametros la constante de la direccion de nuestro json con la funcion leerDatos
    const app = express(); //app = express() es la instancia de express que vamos a usar para crear nuestro servidor
    app.use(express.urlencoded({ extended: false }));

    //4to! Inmediatamente después de const app = express(); configuramos el motor de vistas para manejar nuestros archivos ejs
    app.set("view engine", "ejs"); //view engine indica qué motor procesa las plantillas
    app.set("views", path.join(__dirname, "..", "views")); //views indica dónde se encuentran.

    //Ahora que existen el layout y los parciales, activar express-ejs-layouts dentro de main , después de la configuración de EJS y antes de las rutas:
    app.use(expressLayouts);
    app.set("layout", "layouts/main"); //app.set define la ruta del layout principal
    app.use(express.static(path.join(__dirname, "..", "public")));// app.use define la ruta de los recursos estáticos, en este caso la carpeta public, y express.static es un middleware que sirve para servir archivos estáticos como imágenes, CSS, JavaScript, etc. La ruta se define con path.join para que sea compatible con cualquier sistema operativo.

    app.get("/api/mascotas", (req, res) => {
        res.json(adopcionMascotas); //Generalmente cuando veamos /api vamos a devolver el JSON, y sin /apí vamos a visualizar paginas
    });

    //5to! Empezamos con la pagina principal y agregando las configuraciones para usar los modulos expresslayouts y la direccion del main mas los recuros estatitos como carpetas y archivos
    app.get("/", (req, res) => {
        res.status(200).render("inicio", { titulo: " Mascotas en Adopcion " }); 
    });

    app.get("/mascotas", (req, res) => {
        res.status(200).render("mascotas/lista", {
            titulo: "Mascotas en adopcion",
            adopcionMascotas, //Esta es la variable que va a contener el JSON de mascotas, y que va a ser utilizada en la vista lista.ejs
        })
    });

    app.get("/mascotas/nueva", (req, res) => {
        res.status(200).render("mascotas/nueva", {
            titulo: "Ingresa la nueva mascota",
            error: null,
            valores: {},//En este caso no estamos utilizando nada
        });
    });

    app.get("/mascotas/:id", (req, res) => {
        const id = Number(req.params.id);
        const mascota = adopcionMascotas.find((elemento) => elemento.id === id); //Find va a ir repasando o iterando elemento por elemento y por cada uno pregunta si el id de ese elemento es igual al ID que pase como parametro (const id = "Number(...)")
        if (!mascota) {//EN ESTE CASO SI LA CONDICION FALLA EN LUGAR DE RETORNAR UN MENSAJE VA A RETORNAR UN RENDER 
            return res.status(404).render("no-encontrado", { //Para la vista va a utilizar la plantilla EJS no-encontrado
                titulo: "mascota no encontrada", //Ademas va a pasar como dato el titulo y el mensaje
                mensaje: "No existe mascota con ese identificador.",
            });
        }

        return res.status(200).render("mascotas/detalle", {
            titulo: mascota.nombre,
            mascota,
        });
    });

    app.post("/mascotas", (req, res) => {
        const { nombre, especie, edad, descripcion, estado } = req.body;//Aqui aplica destructuring para acceder a cada constante con req.body
        const nombreMascota = String(nombre ?? "").trim(); //dentro de la constante lo vamos a convertir en un String. ?? es un operador que devuelve el valor de la izquierda si no es null, osea en este caso que no sea un espacio en blanco "". Y trim elimina los espacios en blanco
        const especieMascota = String(especie ?? "").trim();
        const edadMascota = Number(edad); //y aqui lo convertimos a numero
        const descripcionMascota = String(descripcion ?? "").trim();
        const estadoMascota = String(estado ?? "").trim();
        if ( //la condicion ! significa, si no existe.. retorna error 400
            !nombreMascota ||
            !especieMascota ||
            !descripcionMascota ||
            !estadoMascota ||
            !Number.isFinite(edadMascota) || //!Number.isFinite(edadMascota) significa que la edad no es un numero finito, osea que sea un numero valido, retorna error 400
            edadMascota <= 0
        ) {
            return res.status(400).render("mascotas/nueva", {
                titulo: "Nueva mascota ",
                error: "Completá todos los campos con valores válidos.",
                valores: req.body,
            });
        }

        const ultimoId = adopcionMascotas.reduce( //el metodo reduce recorre el array comparando id y devolviendo el mayor id que encuentre, y si no encuentra ninguno devuelve 0
            (mayorId, mascota) => Math.max(mayorId, mascota.id), //Math.max devuelve el mayor de los dos valores que le pasemos
            0, //0 es el numero inicial que le pasamos al metodo reduce
        );

        //El push queda en la memoria pero no guardado en el json
        adopcionMascotas.push({ 
            id: ultimoId + 1,
            nombre: nombreMascota,
            especie: especieMascota,
            edad: edadMascota,
            descripcion: descripcionMascota,
            estado: estadoMascota,
        });        
        res.status().redirect("/mascotas");//res.redirect redirige a la ruta que le pasemos, en este caso a /productos, y ahi va a mostrar la lista de productos con el nuevo producto agregado
    });


    app.listen(PORT, () => {
        console.log(`Aplicación disponible en http://localhost:${PORT}`);
    });
}
main().catch((error) => {
    console.error("No se pudo iniciar la aplicación:", error);
    process.exitCode = 1;
});