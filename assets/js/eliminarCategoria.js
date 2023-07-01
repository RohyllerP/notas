const ulEliminar = document.querySelector('#ul-eliminar');
const btnReturn = document.querySelector('.btnReturn');
const btnMenu = document.querySelector('#menu-modal');
const modalExample = document.querySelector('#exampleModal');
const modalDelete = document.querySelector('#modal-delete');
const modalTexto = document.querySelector('#modal-p');


let arrComa = localStorage.getItem("categorias").slice(0, -1);
let arr = arrComa.split(",");
if (localStorage.getItem("categorias") != undefined) {
    arr.forEach(element => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'border-dark');
        li.innerText = element;

        const but = document.createElement('button');
        but.onclick = (function () {
            modalTexto.innerText = `${element}`;
            btnMenu.click();
        })
        but.classList.add("btn-reset");

        const img = document.createElement('img');
        img.style.width = "30px";
        img.style.height = "30px";
        img.setAttribute("src", "assets/img/eliminar.png");
        but.appendChild(img);
        li.appendChild(but);
        ulEliminar.appendChild(li);
    });
}
modalDelete.onclick = (function () {
    eliminarCategoria(`${modalTexto.innerText}`);
})

let d = 1;
function eliminarCategoria(dato) {
    if (arr.length > 1) {
        let dat = localStorage.getItem("tareas");
        let localData = dat.replace(/,\s*$/, "");
        var arraDatos = JSON.parse("[" + localData + "]");

        var todoArra = arraDatos.filter(num => num.nombre != dato);
        todoArra.forEach(objeto => {
            objeto.id = d;
            d++
        });

        const formatear = JSON.stringify(todoArra).slice(1,-1);
        localStorage.setItem("tareas", `${formatear},`);

        let indice = arr.indexOf(dato);
        arr.splice(indice, 1);
        localStorage.setItem("categorias", `${arr},`);
        window.location.href = "index.html";
    } else {
        localStorage.removeItem('categorias');
        localStorage.removeItem('tareas');
        window.location.href = "index.html";
    }
}
// return back
btnReturn.onclick = () => {
    window.location.href = "index.html";
}