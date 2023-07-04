// add tarea
const btnTarea = document.querySelector("#btnAddTarea");

$(document).ready(function () {
    let contadorSelect = 1;
    // return back
    $('.btnReturn').click(function () {
        window.location.href = "index.html";
    })

    let arrComa = localStorage.getItem("categorias").slice(0, -1);
    let arr = arrComa.split(",");
  
    $('#form-add-tarea').submit(function (event) {
        event.preventDefault();
        validarTarea();
    });

    $('#form-area').keyup(function () {
        inputCategoria();
    });
    if (arr != undefined) {
        arr.forEach(element => {
            const createOption = document.createElement('option');
            createOption.innerText = `${element}`;
            createOption.setAttribute("value", `${contadorSelect}`);
            $('#select-categoria').append(createOption);
            ++contadorSelect;
        });
    }
})


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

function validarTarea() {
    if ($('#select-categoria').val() == 0) {
        alert("selecciona una opcion");
        $('#select-categoria').focus();
        return false;
    }
    if ($('#select-categoria').val() == "") {
        $('#select-categoria').focus();
        $('#mg-error-area').text("Esta vacio");
        return false;
    }

    const dataTarea = localStorage.getItem("tareas");
    if (dataTarea != undefined) {
        const formatearTarea = dataTarea.replace(/,\s*$/, "");
        var arraDatos = JSON.parse("[" + formatearTarea + "]");
    }
    let tamanoData = null;
    if (arraDatos != undefined) {
        tamanoData = arraDatos.length;
    }
    const selec = document.querySelector('#select-categoria');
    const cadenaText = selec.options[selec.selectedIndex].innerHTML;
    let numIdentifi = ++tamanoData;
    const cadena = { id: numIdentifi ?? 1, nombre: `${cadenaText}`, texto: `${$('#form-area').val()}`,aux: 0 };
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