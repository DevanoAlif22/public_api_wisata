const fs = require("fs");
const path = require("path");

export default function (req, res) {
  const provinsiFilePath = path.join(__dirname, "../json/data.json");
  fs.readFile(provinsiFilePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    const wrappedData = { data: JSON.parse(data) };
    res.status(200).json(wrappedData);
  });
}
