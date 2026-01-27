const fs = require("fs");
const http = require("http");
const path = require("path");

const filePath = "./storage/contador.txt";

// Servidor HTTP
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Servir el archivo HTML
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(path.join(__dirname, "index.html")).pipe(res);
  } else if (req.url === "/data") {
    // Leer el archivo cada vez para obtener el valor actualizado
    let contador = 0;
    if (fs.existsSync(filePath)) {
      contador = parseInt(fs.readFileSync(filePath, "utf-8"), 10);
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ contador }));
  } else {
    // Servir archivos estáticos (incluyendo los audios)
    const file = path.join(__dirname, req.url);
    fs.access(file, fs.constants.F_OK, (err) => {
      if (!err) {
        const ext = path.extname(file).toLowerCase();
        const mimeTypes = {
          ".mp3": "audio/mpeg",
          ".html": "text/html",
          ".css": "text/css",
          ".js": "application/javascript",
        };

        const contentType = mimeTypes[ext] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": contentType });
        fs.createReadStream(file).pipe(res);
      } else {
        res.writeHead(404);
        res.end("404 Not Found");
      }
    });
  }
});

server.listen(3000, () => {
  console.log("Servidor en http://localhost:3000/");
});