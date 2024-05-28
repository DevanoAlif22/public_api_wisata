import { log } from "console";

const fs = require("fs");
const path = require("path");

export default function (req, res) {
  const { query } = req;
  const { kodeProvinsi, place_id } = query;
  console.log(query);
  if (!kodeProvinsi || !place_id) {
    res.status(400).json({
      status: 400,
      message: "Bad Request: kodeProvinsi and place_id are required",
    });
    return;
  }

  const provinsiFile = path.join(
    __dirname,
    "../json/wisata",
    `${kodeProvinsi.toLowerCase()}.json`
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

    try {
      const jsonData = JSON.parse(data);
      const placeData = jsonData.find((place) => place.place_id === place_id);

      if (placeData) {
        res.status(200).json({ status: 200, data: placeData });
      } else {
        res.status(404).json({
          status: 200,
          message: "Not Found: No place found with the specified place_id",
        });
      }
    } catch (parseError) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Internal Server Error: Unable to parse JSON data",
        });
    }
  });
}
