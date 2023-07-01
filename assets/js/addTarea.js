// add tarea
const selectCategoria = document.querySelector('#select-categoria');
const btnTarea = document.querySelector("#btnAddTarea");
let contadorSelect = 1;

let arrComa = localStorage.getItem("categorias").slice(0, -1);
let arr = arrComa.split(",");

if(arr != undefined){
    arr.forEach(element => {
        const createOption = document.createElement('option');
        createOption.innerText = `${element}`;
        createOption.setAttribute("value", `${contadorSelect}`);
        selectCategoria.appendChild(createOption);
        ++contadorSelect;
    });
}


function inputCategoria() {
    let mensaje = document.getElementById('mg-error');
    let input = document.getElementById('inputAdd');

    if (input.value.length > 150) {
        mensaje.innerHTML = "La categoria no puede ser mas de 150 caracteres";
        btnTarea.disabled = true;
    } else {
        mensaje.innerHTML = "";
        btnTarea.disabled = false;
    }
}

function validarTarea(form) {
    const mensaje = document.querySelector('#mg-error-area');
    if (form.selectCategoria.value == 0) {
        alert("selecciona una opcion");
        form.selectCategoria.focus();
        return false;
    }
    if (form.addTarea.value == "") {
        form.addTarea.focus();
        mensaje.innerHTML = "Esta vacio";
        return false;
    }

    const dataTarea = localStorage.getItem("tareas");
    if(dataTarea != undefined){
        const formatearTarea = dataTarea.replace(/,\s*$/, "");
        var arraDatos = JSON.parse("[" + formatearTarea + "]");
    }
    let tamanoData = null;
    if (arraDatos != undefined) {
        tamanoData = arraDatos.length;
    }
    const cadenaText = form.selectCategoria.options[form.selectCategoria.selectedIndex].innerText;
    let numIdentifi = ++tamanoData;
    const cadena = { id: numIdentifi ?? 1, nombre: `${cadenaText}`, texto: `${form.addTarea.value}` };
    const formatear = JSON.stringify(cadena);

    const local = localStorage.getItem('tareas');
    if (local == undefined) {
        localStorage.setItem("tareas", `${formatear},`);
    } else {
        const formatearTwo = `${local}${formatear},`;
        localStorage.setItem("tareas", `${formatearTwo}`);
    }

    window.location.href = "index.html";
    return true;
}