const main = document.getElementById('main-inicio-notas');
const divPadre = document.querySelector('#accordionFlush');
const text = document.createElement("h4");
const texto = document.createTextNode('No hay categoria, por favor agrega una');

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
               
                if(elementos.nombre == element){
                  
                    divMensaje.innerText = "* Eliminar dando click al nombre";
                    divMensaje.classList.add("text-danger","pb-5");
                }
            });
            divContentMain.appendChild(divMensaje);
            arraDatos.forEach(elementos => {
                if (elementos.nombre == element) {
                    var divContentTarea = document.createElement("div");
                    var tareaImg = document.createElement("img");
               
                    tareaImg.onclick = (function(){
                        window.location.href = `editar-tarea.html?id=${elementos.id}`;
                    })
                    tareaImg.setAttribute("src","assets/img/editar.svg");
                    tareaImg.style.width = "25px";
                    tareaImg.style.width = "25px";
                    tareaImg.style.cursor = "pointer";
                    divContentTarea.classList.add("d-flex","justify-content-between","border-bottom","border-dark","mb-4");

                    var divContentTareaText = document.createElement("button");
                    divContentTareaText.setAttribute("type","button");
                    divContentTareaText.setAttribute("onclick",`eliminarTarea(${elementos.id});`);
                    divContentTareaText.classList.add("pb-2","pt-2","btn-reset","position-relative","btnDeleteTarea");
                    divContentTareaText.style.left = "-6px";
                    divContentTareaText.innerText = `${elementos.texto}`;
                    divContentTarea.appendChild(divContentTareaText);
                    divContentTarea.appendChild(tareaImg);
                    divContentMain.appendChild(divContentTarea);
                }
            })
        }
        divContentMain.appendChild(divAdd);


        divHeader.appendChild(divButton);
        divItem.appendChild(divHeader);
        divContent.appendChild(divContentMain);
        divItem.appendChild(divContent);
        divPadre.appendChild(divItem);
        ++contador;
    })
} else {
    text.style.paddingLeft = "34px";
    text.classList.add('mt-4');
    text.appendChild(texto);
    main.appendChild(text);
}

