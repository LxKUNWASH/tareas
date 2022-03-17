const colors = require("colors");
const Tarea = require("./tarea");
class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((l) => listado.push(this._listado[l]));
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id=""){
    if(this._listado[id]){
        delete this._listado[id]
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((t) => {
      this._listado[t.id] = t;
    });
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((l, i) => {
      const index = `${i + 1}`.green;
      const { desc, completadoEn } = l;
      const estado = completadoEn ? "completado".green : "pendiente".red;
      console.log(`${index} ${desc} : ${estado} `);
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listarTareasCompletadas() {
      console.log()
    const completadas = this.listadoArr.filter((t) => t.completadoEn);
    completadas.length>0 ?
        completadas.forEach((p, i) => {
            const index = `${i + 1}.`.green;
            const { desc,completadoEn } = p;
            const pendiente = `${completadoEn}`.green
            console.log(`${index} ${desc} fue completada en: ${pendiente}`);
          })
        : console.log("no hay tareas completadas, hay trabajo por hacer".blue)
    }
  

  listarTareasPendientes() {
      console.log()
    const pendientes = this.listadoArr.filter((t) => !t.completadoEn );
   pendientes.length>0 ?
        pendientes.forEach((p, i) => {
            const index = `${i + 1}.`.green;
            const { desc } = p;
            const pendiente = "pendiente".red;
            console.log(`${index} ${desc}, estatus: ${pendiente}`);
          })
        : console.log("Muy bien, no hay ninguna tarea pendiente".green)
        }

        completarTareas (ids) {
          const tareasCompletadas = this.listadoArr.filter((l)=>ids.includes(l.id))
          const tareasSinCompletar = this.listadoArr.filter((l)=>!ids.includes(l.id))
          if (tareasCompletadas){
            tareasCompletadas.map((t)=>{
              const id = t.id
            this._listado[id].completadoEn = new Date() 
          })
          tareasSinCompletar.map((t)=>{
            this._listado[t.id].completadoEn = false
          })
          }
            
        }
}

module.exports = Tareas;
