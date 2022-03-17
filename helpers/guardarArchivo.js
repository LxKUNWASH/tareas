const fs = require("fs");
const archivo = "./db/data.json";

const guardarDB = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerDB = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }

  const info = fs.readFileSync(archivo);

  const data = JSON.parse(info);
  return data
};

module.exports = { guardarDB, leerDB };
