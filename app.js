require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  inquirerPause,
  input,
  opcionesBorrarTarea,
  confirmDelete,
  checkList
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await input("descripcion: ");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.listarTareasCompletadas();
        break;

      case "4":
        tareas.listarTareasPendientes();
        break;

        case "5":
        const ids = await checkList(tareas.listadoArr);
        tareas.completarTareas(ids)
        break;

      case "6":
        const id = await opcionesBorrarTarea(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmDelete("Esta seguro de borrar esta tarea?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log(`La tarea fue borrada con exito`);
          } else {
            console.log("No se borro ninguna tarea");
          }
        }

        break;
    }

    console.log("\n");

    guardarDB(tareas.listadoArr);

    await inquirerPause();
  } while (opt !== "0");
};

main();
