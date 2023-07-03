const datos = localStorage.getItem("tareas");

$(document).ready(function () {
    if (datos != undefined) {
        let localData = datos.replace(/,\s*$/, "");
        let modiJson = JSON.parse("[" + localData + "]");

        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id');
        modiJson.forEach(element => {
            if (element.id == urlId) {
                $('#areaEditar').val(`${element.texto}`);
            }
        });
    }
    $('#form-modi-tarea').submit(function (event) {
        event.preventDefault();
        modiTarea();
    });
    $('#areaEditar').keyup(function () {
        inputArea();
    });

    $('.btnReturn').click(function() {
        window.location.href = "index.html";
    })
})

function inputArea() {
    if ($('#areaEditar').value.length > 150) {
        $('#error-area-edit').val("La categoria no puede ser mas de 150 caracteres");
        $('#btnEditarTarea').disabled = true;
    } else {
        $('#error-area-edit').val("");
        $('#btnEditarTarea').disabled = false;
    }
}

function modiTarea() {
    if ($('#areaEditar').val() == "") {
        $('#areaEditar').focus();
        $('#areaEditar').val("Esta vacio");
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
        arrayDatosTareas[indice].texto = `${$('#areaEditar').val()}`;
        const formatear = JSON.stringify(arrayDatosTareas).slice(1, -1);
        localStorage.setItem("tareas", `${formatear},`);
        window.location.href = "index.html";
    }
}