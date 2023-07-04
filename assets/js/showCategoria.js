$(document).ready(function () {
    const text = document.createElement("h4");
    const texto = document.createTextNode('No hay categoria, por favor agrega una');

    $('#btn-add-categoria').on("click", function () {
        window.location.href = "add-categoria.html";
    })

    // contador
    let contador = 1;
    if (localStorage.getItem("categorias") != undefined) {
        let arrComa = localStorage.getItem("categorias").slice(0, -1);
        let arr = arrComa.split(",");
        // tarea
        const dataTarea = localStorage.getItem("tareas");
        if (dataTarea != undefined) {
            const formatearTarea = dataTarea.replace(/,\s*$/, "");
            var arraDatos = JSON.parse("[" + formatearTarea + "]");
        }

        arr.forEach(function (element) {
            // crear elementos
            const divItem = document.createElement("div");
            const divHeader = document.createElement("h2");
            const divButton = document.createElement("button");
            const divContent = document.createElement("div");
            const divContentMain = document.createElement("div");

            divItem.classList.add("accordion-item", "border-dark");
            divHeader.classList.add("accordion-header");
            divButton.classList.add("accordion-button", "collapsed");
            divButton.setAttribute("data-bs-toggle", "collapse");
            divButton.setAttribute("data-bs-target", `#flush-collapse${contador}`);
            divButton.setAttribute("aria-expanded", "false");
            divButton.setAttribute("aria-controls", `flush-collapse${contador}`);
            divButton.setAttribute("type", "button");
            divButton.innerText = `${element}`;

            divContent.setAttribute("id", `flush-collapse${contador}`);
            divContent.classList.add("accordion-collapse", "collapse");
            divContent.setAttribute("data-bs-parent", "#accordionFlush");

            divContentMain.classList.add("accordion-body");
            // div añadir 
            const divAdd = document.createElement("div");
            const a = document.createElement("a");
            const divImg = document.createElement("img");
            const divSpan = document.createElement("span");

            divAdd.classList.add("pb-2");
            a.setAttribute("href", "add-tarea.html");
            a.style.textDecoration = "none";
            a.classList.add("btn-reset", "text-dark");
            divImg.style.width = "24px";
            divImg.style.height = "24px";
            divImg.setAttribute("src", "assets/img/añadir.png");
            divSpan.classList.add("fs-5", "position-relative", "ps-2");
            divSpan.style.top = "3px";
            divSpan.innerText = "Añadir tarea";
            a.appendChild(divImg);
            a.appendChild(divSpan);
            divAdd.appendChild(a);
            if (arraDatos != undefined) {
                var divMensaje = document.createElement("span");
                arraDatos.forEach(elementos => {
                    if (elementos.nombre == element) {
                        divMensaje.innerText = "* Eliminar dando click a la tarea";
                        divMensaje.classList.add("text-danger", "pb-5");
                    }
                });
                divContentMain.appendChild(divMensaje);
                arraDatos.forEach(elementos => {
                    if (elementos.nombre == element) {
                        var divContentTarea = document.createElement("div");
                        var tareaImg = document.createElement("img");
                        var tareaVerificado = document.createElement("img");
                        var divContentImg = document.createElement("div");

                        tareaVerificado.setAttribute("src", "assets/img/verificado.svg");
                        tareaVerificado.style.width = "25px";
                        tareaVerificado.style.width = "25px";
                        tareaVerificado.style.cursor = "pointer";

                        tareaImg.onclick = (function () {
                            window.location.href = `editar-tarea.html?id=${elementos.id}`;
                        })
                        tareaVerificado.onclick = (function(){
                            clickTarea(elementos.id);
                        })
                        tareaImg.setAttribute("src", "assets/img/editar.svg");
                        tareaImg.style.width = "20px";
                        tareaImg.style.width = "20px";
                        tareaImg.style.cursor = "pointer";

                        divContentTarea.classList.add("d-flex", "justify-content-between", "border-bottom", "border-dark", "mb-4");
                        divContentTarea.setAttribute("id", `tarea-${elementos.id}`);
                        var divContentTareaText = document.createElement("button");
                        divContentTareaText.setAttribute("type", "button");
                        divContentTareaText.setAttribute("onclick", `eliminarTarea(${elementos.id});`);
                        divContentTareaText.classList.add("pb-2", "pt-2", "btn-reset", "position-relative", "btnDeleteTarea");
                        divContentTareaText.style.textAlign = "left";
                        divContentTareaText.style.left = "-6px";
                        if(elementos.aux == 1){
                            divContentTareaText.style.textDecorationLine = "line-through";
                        }
                        divContentTareaText.innerText = `${elementos.texto}`;
                        divContentImg.classList.add("d-flex");
                        divContentImg.style.gap = "10px";
                        divContentTarea.appendChild(divContentTareaText);
                        divContentImg.appendChild(tareaVerificado);
                        divContentImg.appendChild(tareaImg);


                        divContentTarea.appendChild(divContentImg);
                        divContentMain.appendChild(divContentTarea);
                    }
                })
            }
            divContentMain.appendChild(divAdd);

            divHeader.appendChild(divButton);
            divItem.appendChild(divHeader);
            divContent.appendChild(divContentMain);
            divItem.appendChild(divContent);
            $('#accordionFlush').append(divItem);
            ++contador;
        })
    } else {
        text.style.paddingLeft = "34px";
        text.classList.add('mt-4');
        text.appendChild(texto);
        $("#main-inicio-notas").append(text);
    }

})

function clickTarea(dato) {
    const datos = localStorage.getItem("tareas");
    const forTarea = datos.replace(/,\s*$/, "")
    var arraDatos = JSON.parse("[" + forTarea + "]");
    arraDatos.forEach((elemento) => {
        if(elemento.id == dato){
            elemento.aux = 1;
        }
    })
    const formatear = JSON.stringify(arraDatos).slice(1, -1);
    localStorage.setItem("tareas", `${formatear},`);
    location.reload()
}