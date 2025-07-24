// capturando valores
const input = document.getElementById("nueva-tarea")
const formulario = document.getElementById("formulario")
const listaTareas = document.getElementById("lista-tareas")


// ******APARTADO DEL LOCALSTORAGE *************************

document.addEventListener("DOMContentLoaded", function () {
    // carga las tareas ( si hay pues)
    cargarTareas(); 
});



//  ****************************** EVENTOS **********************************
formulario.addEventListener("submit", function(e) {
    // para que no se recargue la pagina
    e.preventDefault();

    // capturamos el valor de la tarea
    const nuevaTarea = input.value;

    // se quitan los espacio en blanco
    if (nuevaTarea.trim() === "") {
        alert("No se ingreso ninguna tarea.")
        return;
    }

    agregarNuevaTarea(nuevaTarea);
    input.value = ""


})

listaTareas.addEventListener("click", function(e) {
    if(e.target.classList.contains('btn-completar')) {
        const li = e.target.parentElement;
        li.classList.toggle("completada")
        guardarTareasEnLocalStorage()
    }
    if (e.target.classList.contains('btn-eliminar')) {
        const li = e.target.parentElement;
        li.remove();
        guardarTareasEnLocalStorage()
    }
})


// ******************************FUNCIONES *********************************
function agregarNuevaTarea(tareaTexto, completada = false) {
    // debemos crear un elemento li en el hthml
    let li = document.createElement("li")
    li.classList.add('tarea')

    // Si ya viene como completada, le agregamos esa clase también
    if (completada) {
        li.classList.add("completada");
    }

    // CREAMOS LA SPAN PARA LUEGO AGREGARLE UNA CLASE.
    let span = document.createElement("span")
    span.textContent = tareaTexto

    // agregamos un boton para marcar
    let btnMarcarTarea = document.createElement('button')
    btnMarcarTarea.textContent = "✅"
    btnMarcarTarea.classList.add('btn-completar')

    // Tambien para eliminar
    let btnEliminarTarea = document.createElement('button')
    btnEliminarTarea.textContent = '🗑️'
    btnEliminarTarea.classList.add("btn-eliminar")


    // agregaos las etiquetas que creamos al li
    li.appendChild(span)
    li.appendChild(btnMarcarTarea)
    li.appendChild(btnEliminarTarea)

    // agreamos el li a la lista 
    listaTareas.appendChild(li)

    // usamos la funcion para guardar todas las tareas.
    guardarTareasEnLocalStorage()
}





function guardarTareasEnLocalStorage() {
    let tareas = [] // creamos arreglo vacio
    
    let elementos = document.querySelectorAll(".tarea")
    // recoremos cada tarea para guardar su texto y su valor
    elementos.forEach((li) => {
        let tarea = {
            texto : li.querySelector('span').textContent,
            completada : li.classList.contains('completada')
        }
    tareas.push(tarea);

    })

    // lo guarda en formato texto en local
    localStorage.setItem('tareas',JSON.stringify(tareas))

}

// para mostrar las tareas nuevamente.
function cargarTareas() {
    let tareasTexto = localStorage.getItem("tareas")

    // verificamos si hay tareas dentro del Local
    if( tareasTexto) {
        // las pasamos a su forma de arreglo
        let tareas = JSON.parse(tareasTexto) 

        // recorremos el arreglo agregando su texto y su valor.
        tareas.forEach( (t) => {
            agregarNuevaTarea(t.texto, t.completada)
        })
    }


}