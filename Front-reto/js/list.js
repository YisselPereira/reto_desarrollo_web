//Declaracion de variables
const d = document,
    title = d.getElementById("nombre-lista"),
    crear = d.getElementById("crear"),
    body = d.querySelector('.tbody1'),
    input = d.getElementById('inputTarea').value
const url = 'http://localhost:8080';
let resultado = ''
let resultadoSub = ''
let subtarea = {};


let iconoBorrar = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 EliminarTarea" viewBox="0 0 16 16">\n' +
    '  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>\n' +
    '</svg>';

let iconoBorrar2 = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 eliminar" viewBox="0 0 16 16">\n' +
    '  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>\n' +
    '</svg>';
let iconoEditar = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"className="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/> </svg>';


//funcion boton crear , permite guardar en el input el nombre de la nueva lista a crear
crear.addEventListener('click', e => {
    e.preventDefault();
    crearList(d.getElementById('inputTarea').value)

})
//Funcion crear lista , consulta la ruta del fetch y realiza el metodo post con los datos 
async function crearList(lista) {
    if (lista) {
        let options = {
            method: "POST",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
            body: JSON.stringify({
                name: lista
            })
        },
            res = await fetch(`${url}/lista`, options)
        mostrarList();
        document.getElementById("inputTarea").value = ""
    } else {
        swal("Ups!"," Ingrese una tarea, por favor");
    }
}

//muestra las listas en la BD
async function mostrarList() {
    let res = await fetch(`${url}/listas`)
    let data = await res.json()
        .catch(error => console.log(error))
    mostrar(data)
    
}
mostrarList()

//Muestra la lista creada mediante 2 busquedas para mostrar
const mostrar = (listas) => {

    listas.forEach(lista => {
        resultadoSub = ''
        lista.listTask.forEach(sub => {
            resultadoSub += ` <tr>
                <td class="id oculto">${sub.id}</td>
                <td class="Tarea">${sub.name}</td>
                <td class="completado">
                    <input class="validar form-check-input" id="validar${sub.id}" type="checkbox" id="flexSwitchCheckDefault" ${sub.completed? 'checked':''}>
                    <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                </td>
                <td class="opciones">
                    <button class="editar btn btn-info" value="${sub.id}" type="button" id="editar${sub.id}" class="editar btn btn-secondary">${iconoEditar}</button>
                    <button class="eliminar btn btn-danger" type="button" id="eliminar${sub.id}" >${iconoBorrar2}</button>
                </td>
            </tr>`
        })
        resultado += ` <hr>
        <div  id="${lista.id}">
            <div class="input-group " id = "${lista.id}">
                <h3 id="nombre-lista">Tarea : ${lista.name}</h3>
                <button class="EliminarTarea btn btn-danger" type="submit" id="borrar${lista.id}" ">${iconoBorrar}</button>
            </div>
            <input class="form-control me-sm-2" type="text" id="inputTarea${lista.id}" placeholder="¿Que piensas hacer?">
            <button class="agregarSubList btn btn-success my-2 my-sm-0" type="submit" id="crear${lista.id}" value="${lista.id}">Crear</button>
            <button style="display:none;" class="actualizarSubList btn btn-success my-2 my-sm-0" type="submit" id="Actualizar${lista.id}" value="${lista.id}">Actualizar</button>
            <br>
            <table class="table" id="${lista.id}">
                <thead>
                    <tr>
                    <!--No muestro el ID-->
                    <!--th>ID</th-->
                    <th>Tarea</th>
                    <th>¿completado?</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${resultadoSub}
                </tbody>
            </table>
        </div>
        `
    })
    document.querySelector('.tbody1').innerHTML = resultado;
    resultado = "";
}


body.addEventListener("click", (e) => {
    console.log(e.target.parentElement.parentElement.id, "Click");

    if (e.target.classList[0] == "EliminarTarea") {
        if(e.target.tagName == 'svg'){
            eliminarTarea(e.target.parentElement.parentElement.parentElement.id)
        }
        else{
            eliminarTarea(e.target.parentElement.parentElement.id)
        }
    }
    if (e.target.classList[0] == "agregarSubList") {

        //console.log(e.path[0].value);
        let dato = {
            nombre: e.target.previousElementSibling.value,
            id: e.path[0].value
        }
        crearSubLista(dato)

    }

    /**
     * Modificar subtarea
     */
    if(e.target.classList[0] == "actualizarSubList"){
        modificarSubLista(subtarea.idpadre, subtarea.id, e.target.previousElementSibling.previousElementSibling.value, subtarea.completed);
    }


    /**
     * eliminar subtarea
    */
    if (e.target.classList[0] == "eliminar") {
        if(e.target.tagName == 'svg'){
            eliminarSubTarea(e.target.parentElement.parentElement.parentElement.children[0].textContent)
        }else{
            eliminarSubTarea(e.target.parentElement.parentElement.children[0].textContent)
        }
    }
    /**
     * editar subtarea , al pulsar el boton editar , muestra en el input con nombre de la tare actual
     * me permite
    */
    if (e.target.classList[0] == "editar") {
        e.preventDefault()
        subtarea.id = e.path[0].value
        subtarea.name = e.path[2].children[1].textContent;
        subtarea.idpadre = e.path[4].id;
        subtarea.completed = d.getElementById('validar' + e.path[2].children[3].children[0].value).checked;

        let input = e.path[5].children[1];
        let btncrear = d.getElementById('crear' + e.path[4].id)
        let boton = d.getElementById('Actualizar' + e.path[4].id)
        btncrear.style.display = "none";
        boton.style.display = "";
        console.log(e.path[4]);
        input.value = subtarea.name
    }
    /**
     * function validar , verifica el estado del check para cambiar el estado del boton editar
     */
    if (e.target.classList[0] == "validar") {
        console.log(e.path[2].children[3].children[0].value);
        let btnvalidar = d.getElementById('editar' + e.path[2].children[3].children[0].value)
        let check = d.getElementById('validar' + e.path[2].children[3].children[0].value).checked
        let nombre = e.target.parentElement.previousElementSibling.textContent;
        let id = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        let idLista = e.path[4].id;
        if (check) {
            btnvalidar.disabled = true;
        } else {
            btnvalidar.disabled = false;
        }
        modificarSubLista(idLista,id,nombre,check);

    }

})



//funcion eliminar , recibe como parametro el ID
async function eliminarTarea(id) {
    let willDelete = await swal({
        title: "Estas seguro que quieres eliminar esta tarea?",
        text: "Una vez eliminada, no se puede recuperar",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    });
    if(willDelete){
        let res
        console.log(id);
        let options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
        }
        res = await fetch(`${url}/lista/${id}`, options)
        mostrarList()
        swal("Poof! Tu tarea ha sido eliminada", {
            icon: "success",
        });
    }
}
//Crear SubTarea
async function crearSubLista({ nombre, id }) {
    if (nombre) {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                completed: false,
                name: nombre,
                listaid: {
                    id: id
                }
            })
        },
            res = await fetch(`${url}/listTask`, options)
        mostrarList()
    } else {
        swal("Ups!", "Ingrese una sub tarea, por favor");
    }
}
//eliminar subTarea
async function eliminarSubTarea(id) {
    let willDelete = await swal({
        title: "Estas seguro que quieres eliminar esta tarea?",
        text: "Una vez eliminada, no se puede recuperar",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    });
    if (willDelete) {
        let options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
        }
        let res;
        res = await fetch(`${url}/listTask/${id}`, options)
        mostrarList()
        swal("Poof! Tu tarea ha sido eliminada", {
            icon: "success",
        });
    }
}
/**
 * Editar sub lista 
 * @param {*} id1 
 * @param {*} id2 
 * @param {*} nombre 
 */
async function modificarSubLista(idLista, idTarea, nombre, completed) {
    if (nombre) {
        let options = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    completed: completed,
                    name: nombre,
                    listaid: {
                        id: idLista
                    }
                })
            },
            res = await fetch(`${url}/listTask/${idTarea}`, options)
        mostrarList()
    }
}












