// capturando valores
const input = document.getElementById("nueva-tarea")
const formulario = document.getElementById("formulario")
const listaTareas = document.getElementById("lista-tareas")


// ******APARTADO DEL LOCALSTORAGE *************************





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
    }
    if (e.target.classList.contains('btn-eliminar')) {
        const li = e.target.parentElement;
        li.remove();
    }
})


// ******************************FUNCIONES *********************************
function agregarNuevaTarea(tarea) {
    // debemos crear un elemento li en el hthml
    let li = document.createElement("li")
    li.classList.add('tarea')


    // CREAMOS LA SPAN PARA LUEGO AGREGARLE UNA CLASE.
    let span = document.createElement("span")
    span.textContent = tarea

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
}

