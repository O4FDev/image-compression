const sharp = require("sharp");
const fs = require("fs");

function compressImage(imagePath, file) {
    sharp.cache(false);
    file.isFile() && file.name.split(".")[1] !== "jpg" &&
        sharp(`${imagePath}/${file.name}`)
            .jpeg({ quality: 80 })
            .toFile(`${imagePath}/${file.name.split(".")[0]}.jpg`)
            .then(() => {
                console.log(`Created ${file.name}.jpg`);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );
    file.isFile() &&
        sharp(`${imagePath}/${file.name}`)
            .webp({ quality: 80 })
            .toFile(`${imagePath}/${file.name.split(".")[0]}.webp`)
            .then(() => {
                console.log(`Created ${file.name}.webp`);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );
    file.isFile() &&
        sharp(`${imagePath}/${file.name}`)
            .avif({ quality: 80 })
            .toFile(`${imagePath}/${file.name.split(".")[0]}.avif`)
            .then(() => {
                console.log(`Created ${file.name}.avif`);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );
}

fs.readdirSync("./images").forEach((dir) => {
    if (dir === ".DS_Store") {
        return;
    }
    fs.readdirSync(`./images/${dir}`).forEach((file) => {
        compressImage(`./images/${dir}`, { name: file, isFile: () => true });
    });
}
);
