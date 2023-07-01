const btnReturn = document.querySelector('.btnReturn');
const guardar = document.querySelector('#btnAddCategoria');
const btnCategoria = document.querySelector('#menu-modal');

// add categoria

// return back
btnReturn.onclick = () => {
    window.location.href = "index.html";
}

// add categoria 
function inputCategoria() {
    var mensaje = document.getElementById('mg-error');
    var input = document.getElementById('inputAdd');

    if (input.value.length > 40) {
        mensaje.innerHTML = "La categoria no puede ser mas de 40 caracteres";
        guardar.disabled = true;
    } else {
        mensaje.innerHTML = "";
        guardar.disabled = false;
    }
}

// formulario enviar
function validarAdd(form) {
    var mensaje = document.getElementById('mg-error');

    if (form.addCategoria.value == "") {
        form.addCategoria.focus();
        mensaje.innerHTML = "Esta vacio";
        return false;
    } else {
        var cadena = localStorage.getItem("categorias");
     
        if (cadena != undefined) {
            let mayus = cadena.toLocaleUpperCase();
            let arr = mayus.slice(0, -1).split(',');
            console.log(arr);
            let nombre = form.addCategoria.value;
            let auxNombre = nombre.toLocaleUpperCase();
            const buscarTarea = arr.includes(auxNombre);
            if(buscarTarea != true){
                var arra = `${cadena}${form.addCategoria.value},`;
            }else{
                btnCategoria.click();
                return false;
            }
        } else {
            var arra = `${form.addCategoria.value},`;
        }
        localStorage.setItem("categorias", `${arra}`);
        window.location.href = "index.html";
        return true;
    }
}
