const datos = localStorage.getItem("tareas");

$(document).ready(function () {
    $('#modal-delete').click(function () {
        modalDelete();
    });
})


var datoAux = "";
function eliminarTarea(dato) {
    $('#menu-modal').click();
    datoAux = dato;
}
let aux = 1;
function modalDelete() {
    const forTarea = datos.replace(/,\s*$/, "")
    var arrayDatosTareas = JSON.parse("[" + forTarea + "]");
    if (arrayDatosTareas.length > 1) {
        let arr = arrayDatosTareas.filter((dat) => dat.id != datoAux);
        arr.forEach(element => {
            if (element.id == datoAux) {
                $('#areaEditar').val(`${element.texto}`);
            }
            element.id = aux;
            aux++;
        });
        const formatear = JSON.stringify(arr).slice(1, -1);
        localStorage.setItem("tareas", `${formatear},`);
    }else{
        $('#mg-error-area').text("");
        localStorage.removeItem("tareas");
    }
    location.reload()
}