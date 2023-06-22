<!-- Instalaciones -->
npm install express multer cors dotenv

<!-- OBTENER TODOS LOS ARCHIVOS -->
GET: http://localhost:8080/files

<!-- DESCARGAR UN ARCHIVO -->
GET: http://localhost:8080/files/name.extension

<!-- SUBIR UN ARCHIVO -->
POST: http://localhost:8080/upload

<!-- ELIMINAR UN ARCHIVO -->
DELETE: http://localhost:8080/files/name.extension