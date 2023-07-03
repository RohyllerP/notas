$(document).ready(function () {
    if (localStorage.getItem('categorias')) {
        var arrComa = localStorage.getItem("categorias").slice(0, -1);
        var arr = arrComa.split(",");

        arr.forEach(element => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'border-dark');
            li.innerText = element;

            const but = document.createElement('button');
            but.onclick = (function () {
                $('#modal-p').text = `${element}`;
                btnMenu.click();
            })
            but.classList.add("btn-reset");

            const img = document.createElement('img');
            img.style.width = "30px";
            img.style.height = "30px";
            img.setAttribute("src", "assets/img/eliminar.png");
            but.appendChild(img);
            li.appendChild(but);
            $('#ul-eliminar').append(li);
        })

        let d = 1;
        function eliminarCategoria(dato) {
            if (arr.length > 1) {
                let dat = localStorage.getItem("tareas");
                if (dat != undefined) {
                    let localData = dat.replace(/,\s*$/, "");
                    var arraDatos = JSON.parse("[" + localData + "]");
                    var todoArra = arraDatos.filter(num => num.nombre != dato);
                    todoArra.forEach(objeto => {
                        objeto.id = d;
                        d++
                    });
                    const formatear = JSON.stringify(todoArra).slice(1, -1);
                    localStorage.setItem("tareas", `${formatear},`);
                }

                let indice = arr.indexOf(dato);
                arr.splice(indice, 1);
                localStorage.setItem("categorias", `${arr},`);
                // window.location.href = "index.html";
            } else {
                localStorage.removeItem('categorias');
                localStorage.removeItem('tareas');
                // window.location.href = "index.html";
            }
        }
        $('#modal-delete').click(function () {
            eliminarCategoria(`${$('#modal-p').text()}`);
        })
    }
    // return back
    $('.btnReturn').click(function(){
        window.location.href = "index.html";
    })
})