const inquirer = require("inquirer");
require("colors");

const pauseInfo = [{
    type:"input",
    name:"pause",
    message:`Presione ${"Enter".green} para continuar`
}]
const questions = [{
    type:"list",
    name:"opt",
    message:"¿Que desea hacer?",
    choices: [
        {
            value:"1",
            name:`${"1.".green} Crear tarea`
        },
        {
            value:"2",
            name:`${"2.".green} Listar tareas`
        },
        {
            value:"3",
            name:`${"3.".green} Listar tareas completadas`
        },
        {
            value:"4",
            name:`${"4.".green} Listar tareas pendientes`
        },
        {
            value:"5",
            name:`${"5.".green} Completar tareas(s)`
        },
        {
            value:"6",
            name:`${"6.".green} Borrar tarea`
        },
        {
            value:"0",
            name:`${"0.".green} salir\n`
        }
]
}]

const inquirerMenu = async () =>{

    console.clear();
    console.log("===================================".green);
    console.log("      Seleccione una opcion        ".blue)
    console.log("===================================\n".green);

    const {opt} = await inquirer.prompt(questions);
    return opt;


}

const inquirerPause = async ()=>{
    const pause = await inquirer.prompt(pauseInfo)
    return pause
} 

const input = async (message) =>{
    const question = [{
        type:"input",
        name:"desc",
        message,
        validate(value){
            if(value.length===0){
                return "por favor ingrese un valor "
            } else{
                return true 
            }
        }
    }]
    const {desc} = await inquirer.prompt(question)
    return desc
}

const opcionesBorrarTarea = async(tareas=[])=>{
const choices = tareas.map((tarea,i)=>{

const index = i+1
const {id,desc} = tarea
return{
    value:id,
    name:`${index}.`.green+` ${desc}`,
}
})

choices.unshift({
    value: "0" ,
    name:"Cancelar"
})

const borrarMenu = [{
    type:"list",
    name:"id",
    message:"Borrar tarea",
    choices
}]


const {id} = await inquirer.prompt(borrarMenu)
return id
}

const confirmDelete = async (message) =>{

const eraseInfo = [{
type:"confirm",
name:"ok",
message
}]
const {ok} = await inquirer.prompt(eraseInfo)
return ok
}

const checkList = async(tareas=[])=>{
    const choices = tareas.map((tarea,i)=>{
    
    const index = i+1
    const {id,desc} = tarea
    return{
        value:id,
        name:`${index}.`.green+` ${desc}`,
        checked: tarea.completadoEn ? true : false
    }
    })
    
    const checkMenu = [{
        type:"checkbox",
        name:"ids",
        message:"Selecciones",
        choices
    }]
    const {ids} = await inquirer.prompt(checkMenu)
    return ids
    }


module.exports= {
    inquirerMenu,
    inquirerPause,
    input,
    opcionesBorrarTarea,
    confirmDelete,
    checkList
}