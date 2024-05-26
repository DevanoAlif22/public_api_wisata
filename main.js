const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Path ke file JSON provinsi
const provinsiFilePath = path.join(__dirname, "json/data.json");

// Membuat server HTTP
const server = http.createServer((req, res) => {
  // Mengatur header respons
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); // Untuk mengizinkan permintaan dari semua domain (cors)

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  if (method === "GET" && pathname === "/provinsi") {
    fs.readFile(provinsiFilePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }

      // Membungkus data dalam kunci "data" dan mengirim respons
      const wrappedData = { data: JSON.parse(data) };
      res.writeHead(200); // Status OK
      res.end(JSON.stringify(wrappedData));
    });
  } else if (method === "GET" && pathname.startsWith("/wisata/")) {
    const kodeProvinsi = pathname.split("/")[2];
    console.log("Received request for province code:", kodeProvinsi);

    if (kodeProvinsi) {
      const provinsiFile = path.join(
        __dirname,
        "json/wisata",
        `${kodeProvinsi.toLowerCase()}.json`
      );

      fs.readFile(provinsiFile, "utf8", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end(
            "Not Found: No tourism data found for the specified province code"
          );
          return;
        }

        // Membungkus data dalam kunci "data" dan mengirim respons
        const wrappedData = { data: JSON.parse(data) };
        res.writeHead(200); // Status OK
        res.end(JSON.stringify(wrappedData));
      });
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request: kode_provinsi is required");
    }
  } else {
    // Menangani rute lainnya
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Menentukan port server
const PORT = 3000;

// Menjalankan server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
