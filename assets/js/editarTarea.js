const guardar = document.querySelector("#btnEditarTarea");
const btnReturn = document.querySelector('.btnReturn');
const areaEditar = document.querySelector("#areaEditar");
const datos = localStorage.getItem("tareas");


if (datos != undefined) {
    let localData = datos.replace(/,\s*$/, "");
    let modiJson = JSON.parse("[" + localData + "]");

    const urlParams = new URLSearchParams(window.location.search);
    const urlId = urlParams.get('id');
    modiJson.forEach(element => {
        if (element.id == urlId) {
            areaEditar.value = `${element.texto}`;
        }
    });
}

function inputArea() {
    let mensaje = document.getElementById('error-area-edit');

    if (areaEditar.value.length > 150) {
        mensaje.innerHTML = "La categoria no puede ser mas de 150 caracteres";
        guardar.disabled = true;
    } else {
        mensaje.innerHTML = "";
        guardar.disabled = false;
    }
}

function modiTarea(form) {
    let mensaje = document.querySelector('#error-area-edit');
    if (form.editarTarea.value == "") {
        form.editarTarea.focus();
        mensaje.innerHTML = "Esta vacio";
        return false;
    }

    if (datos != undefined) {
        const forTarea = datos.replace(/,\s*$/, "")
        var arrayDatosTareas = JSON.parse("[" + forTarea + "]");

        // id a comparar
        let urlParams = new URLSearchParams(window.location.search);
        let urlId = urlParams.get('id');

        // funcion de busqueda
        const buscarTarea = (tarea) => tarea.id == urlId;
        const indice = arrayDatosTareas.findIndex(buscarTarea);
        arrayDatosTareas[indice].texto = `${form.editarTarea.value}`;
        const formatear = JSON.stringify(arrayDatosTareas).slice(1,-1);
        localStorage.setItem("tareas",`${formatear},`);
        window.location.href = "index.html";
    }
}

btnReturn.onclick = () => {
    window.location.href = "index.html";
}