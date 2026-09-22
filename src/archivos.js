const fs = require("node:fs/promises"); //Primero cargamos las promesas del modulo fs (fyle System)

async function leerJson(ruta) {
    try {
        const contenido = await fs.readFile(ruta, "utf-8"); 
        return JSON.parse(contenido);

    } catch (error) {
        console.error("Error al leer el archivo JSON:", error);
        throw error;
    }
} 

async function escribirJson(ruta, contenido) {
    try {
        const texto = JSON.stringify(contenido, null, 2); //(contenido, null, 2): Convierte el objeto contenido en una cadena JSON con una sangría de 2 espacios para mejorar la legibilidad.
        await fs.writeFile(ruta, texto, "utf-8");
        console.log("Archivo JSON escrito correctamente");
    } catch (error) {
        console.log("Error al escribir Json", error);
    }
    
}

module.exports = { leerJson, escribirJson };//Creamos una funcion para leer archivos con formato Json