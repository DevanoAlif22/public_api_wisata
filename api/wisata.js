const fs = require("fs");
const path = require("path");

export default function (req, res) {
  const { kodeProvinsi } = req.query;

  if (!kodeProvinsi) {
    res.status(400).json({
      status: 404,
      message: "Bad Request: kode_provinsi is required",
    });
    return;
  }

  const provinsiFile = path.join(
    __dirname,
    `../json/wisata/${kodeProvinsi.toLowerCase()}.json`
  );

  fs.readFile(provinsiFile, "utf8", (err, data) => {
    if (err) {
      res.status(404).json({
        status: 404,
        message:
          "Not Found: No tourism data found for the specified province code",
      });
      return;
    }

    const wrappedData = {
      status: 200,
      message: "Success",
      data: JSON.parse(data),
    };
    res.status(200).json(wrappedData);
  });
}
