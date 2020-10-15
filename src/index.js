const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const WIDTH = 350;
const HEIGHT = 233;

const INPUT_FOLDER = "/../inputs";
const OUTPUT_FOLDER = "/../outputs";

const main = async () => {
  //Cleaning to outputs directory
  await fs.readdirSync(path.join(__dirname, OUTPUT_FOLDER), (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(__dirname, OUTPUT_FOLDER, file), (err) => {
        if (err) throw err;
      });
    }
  });

  // Converting
  fs.readdir(path.join(__dirname, INPUT_FOLDER), (err, data) => {
    if (err) throw err;

    data.map((img) => {
      sharp(path.join(__dirname, INPUT_FOLDER, img))
        .resize(WIDTH, HEIGHT, {
          fit: "cover",
        })
        .webp()
        .toFile(
          path.join(
            __dirname,
            OUTPUT_FOLDER,
            img.split(".").slice(0, -1).join(".") + ".webp"
          )
        );
    });
  });
};

main();
