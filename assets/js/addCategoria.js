$(document).ready(function () {
    // return back
    $('.btnReturn').click(function () {
        window.location.href = "index.html";
    })
    $('#form-add-categoria').submit(function (event) {
        event.preventDefault();
        validarAdd();
    });
    $('#miInput').keyup(function () {
        inputCategoria();
    });
})

// add categoria 
function inputCategoria() {
    if ($('#inputAdd').val().length > 40) {
        $('#mg-error').text("La categoria no puede ser mas de 40 caracteres");
        $('#btnAddCategoria').prop('disabled', true);
    } else {
        $('#mg-error').text("");
        $('#btnAddCategoria').prop('disabled', false);
    }
}

// formulario enviar
function validarAdd() {
    if ($('#inputAdd').val() == "") {
        $('#inputAdd').focus();
        $('mg-error').text("Esta vacio");
        return false;
    } else {
        var cadena = localStorage.getItem("categorias");

        if (cadena != undefined) {
            let mayus = cadena.toLocaleUpperCase();
            let arr = mayus.slice(0, -1).split(',');

            let nombre = $('#inputAdd').val();
            let auxNombre = nombre.toLocaleUpperCase();
            const buscarTarea = arr.includes(auxNombre);
            if (buscarTarea != true) {
                var arra = `${cadena}${$('#inputAdd').val()},`;
            } else {
                $('#menu-modal').click();
                return false;
            }
        } else {
            var arra = `${$('#inputAdd').val()},`;
        }
        localStorage.setItem("categorias", `${arra}`);
        window.location.href = "index.html";
        return true;
    }
}