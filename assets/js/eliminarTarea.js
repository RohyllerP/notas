const btnMenu = document.querySelector("#menu-modal");
const btnDelete = document.querySelector("#modal-delete");
const datos = localStorage.getItem("tareas");

let aux = 1;


btnDelete.onclick = (function(){
    auxDelete = modalDelete();
});

var datoAux = "";
function eliminarTarea(dato){
    btnMenu.click();
    datoAux = dato;
}
function modalDelete(){
    const forTarea = datos.replace(/,\s*$/, "")
    var arrayDatosTareas = JSON.parse("[" + forTarea + "]");
    let arr = arrayDatosTareas.filter((dat) => dat.id != datoAux);
    arr.forEach(element => {
        if (element.id == datoAux) {
            areaEditar.value = `${element.texto}`;
        }
    });
    arr.forEach(objeto => {
        objeto.id = aux;
        aux++;
    });
    const formatear = JSON.stringify(arr).slice(1,-1);
    localStorage.setItem("tareas", `${formatear},`);
    location.reload();
}