const fs = require("fs");
const path = require("path");

export default function (req, res) {
  const provinsiFilePath = path.join(__dirname, "../json/data.json");
  fs.readFile(provinsiFilePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
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
