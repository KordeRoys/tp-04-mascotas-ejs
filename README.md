# Trabajo práctico 04
## Descripción: Este proyecto es una pagina de una guarderia de mascotas, donde se hace registo de las nuevas mascotas ingresadas en la guarderia como la visualizacion detallada de las mascotas ya ingresadas anteriormente.

## Instalación: Una vez descargado el archivo seleccionamos la hubicacion de la carpeta contenedora tp-04-mascotas-ejs y por terminal agregamos el comando: npm install y se descargaran los paquetes de librerias ya declaradas en las dependencias

## Ejecución: Para ejecutar localmente debemos iniciar la pagina por terminal (ya habiendo seleccionado ya hubicacion del archivo) agregando el comando: npm start

## Páginas y rutas:
## Endpoints: GET http://localhost:3000/
#             GET http://localhost:3000/api/mascotas
#             GET http://localhost:3000/mascotas
#             GET http://localhost:3000/mascotas/nueva
#             GET http://localhost:3000/mascotas/:id (:"numero de id ej 1")
#            POST http://localhost:3000/mascotas
## Estructura de vistas: 
#    |-- views/
#    | |-- layouts/
#    | | `-- main.ejs
#    | |-- partials/
#    | | |-- encabezado.ejs
#    | | `-- pie.ejs
#    | |-- mascotas/
#    | | |-- lista.ejs
#    | | |-- detalle.ejs
#    | | `-- nueva.ejs
#    | |-- inicio.ejs
#    | `-- no-encontrado.ejs

## Recursos estáticos: public => img/css/js

## Formulario: Visible en nueva.ejs

## Persistencia de los datos: Solo en la memoria del buscador mientras la pagina no sea recargada.

## RESPUESTAS APARTE:

# - diferencia entre layout, vista y parcial: Vistas matiene dentro las carpetas con los archivos ejs que se llamaran dede el index.js, layouts contiene la estructura HTML principal como su cuerpo y partial que es la carpeta que contiene otras estructuras como el encabezado y el pie de pagina, que van a ser incluidos desde el archivo layouts/main.ejs.

# - datos enviados a una vista mediante res.render: Render es una funcion que se usa para procesar una plantilla de EJS (Embedded JavaScript) enviando datos a travez de res(respuesta) que es el parametro que trabajamos dentro de una funcion para una peticion dentro de un servidor.

# - función de express.static : Es un middleware que sirve para servir archivos estáticos como imágenes, CSS, JavaScript, etc

# - función de express.urlencoded : Es un middleware que sirve para procesar los datos enviados por un formulario HTML 

# - motivo por el cual el nuevo registro desaparece al reiniciar: El metodo push agrega a la memoria una nueva mascota, pero al no haber una funcion de escritura los datos agregados no persisten despues de la recarga de la pagina.