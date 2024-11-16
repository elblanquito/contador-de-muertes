// server.js
const fs = require("fs");
const http = require("http");
const path = require("path");
const { GlobalKeyboardListener } = require("node-global-key-listener");

const filePath = "contador.txt";
let contador = 0;

// Leer el archivo inicialmente y actualizar el contador
if (fs.existsSync(filePath)) {
  contador = parseInt(fs.readFileSync(filePath, "utf-8"), 10);
} else {
  fs.writeFileSync(filePath, contador.toString());
}

// Función para actualizar el archivo con el valor actual del contador
function actualizarArchivo() {
  fs.writeFileSync(filePath, contador.toString(), "utf-8");
}

// Configuración de escucha global del teclado
const keyboardListener = new GlobalKeyboardListener();

keyboardListener.addListener((e) => {
  if (e.state === "DOWN") {
    if (e.name === "0") {
      contador++;
      actualizarArchivo();
      console.log(`Contador: ${contador}`);
    } else if (e.name === "9" && contador > 0) {
      contador--;
      actualizarArchivo();
      console.log(`Contador: ${contador}`);
    }
  }
});

// Servidor HTTP
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Servir el archivo HTML
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(path.join(__dirname, "index.html")).pipe(res);
  } else if (req.url === "/data") {
    // Servir el contenido del archivo .txt
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(contador.toString());
  } else {
    res.writeHead(404);
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
