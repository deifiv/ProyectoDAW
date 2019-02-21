window.onload = init;

function init() {
    var recetas = document.getElementById("recetas");
    var celdas = document.getElementsByTagName("td");
    var boton_ver = document.getElementById("ver_receta");
    //para el boton_ver no se pedía nada en el ejercicio, yo simplemente he mostrado un alert con lo
    //que haya en el select
    boton_ver.addEventListener("click", function () {
        verReceta(recetas.value);
    });

    //cada celda de la tabla al hacer click ejecutará la función añadirReceta()
    for (var i = 0; i < celdas.length; i++) {

        celdas[i].addEventListener("click", añadirReceta);

    }
    //este boton es el de añadir fila, ejecutara la función añadirFila()
    var boton = document.getElementById("añadir_fila");
    boton.addEventListener("click", añadirFila);

    //cambiarEstilo(), cambia el estilo de las letras y el color de la tabla
    cambiarEstilo();

    //ultimas_preferencias() la llamo en el init para que aplique los últimos cambios guardados
    ultimas_preferencias();

}

function verReceta(receta) {
    alert(receta);

}

function añadirReceta() {
    var casilla = document.getElementById("casilla_borrar");
    var recetas = document.getElementById("recetas");
    //creo un parrafo para que se vean con salto de línea
    var parrafo = document.createElement("p");
    //si la casilla esta desmarcada
        if (!casilla.checked) {
            //creo un nuevo enlace
            var enlace = document.createElement("a");
            //con el contenido del select
            var contenido_enlace = document.createTextNode(recetas.value);
            //añado el contenido al enlace
            enlace.appendChild(contenido_enlace);
            //añado los enlaces al párrafo
            this.appendChild(parrafo).appendChild(enlace);
            //creo el atributo href con el sitio donde se encuentran las recetas
            enlace.setAttribute("href", "Recetas/" + recetas.value + ".txt");
            //le añado el atributo _blank para que se abran en una pestaña nueva
            enlace.setAttribute("target", "_blank");


            //si la casilla esta marcada, borro todos los hijos de la celda que se ha clicado
        } else {
            while (this.hasChildNodes()) {
                this.removeChild(this.firstChild);
            }
        }
    
}

function añadirFila() {
    //creo 1 una fila con 5 tds y los añado a la tabla
    var tabla = document.getElementsByTagName("tbody")[0];
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    tabla.appendChild(tr).appendChild(td1);
    tabla.appendChild(tr).appendChild(td2);
    tabla.appendChild(tr).appendChild(td3);
    tabla.appendChild(tr).appendChild(td4);
    tabla.appendChild(tr).appendChild(td5);
    //modifico el alto de las filas, porque sino se ven muy pequeñas
    tr.style.height = "100px";
//recorro de nuevo las celdas para añadirces la función añadirReceta() en el evento clic
    var celdas = document.getElementsByTagName("td");
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].addEventListener("click", añadirReceta);

    }

}

function cambiarEstilo() {

    var tabla = document.getElementsByTagName("tbody")[0];
    var enlaces = document.getElementsByTagName("a");
    var th = document.getElementsByTagName("th");
    var color = document.getElementById("colores");
    var letras = document.getElementById("tipos_letras");
    var boton = document.getElementById("guardar_preferencias");
    //le añado el evento change a los select del tipo de color y del tipo de letra
    color.addEventListener("change", function () {

        //cambio el color de todos los enlaces por el color que se ha especificado en el select
        for (var i = 0; i < enlaces.length; i++) {
            enlaces[i].style.color = color.value;
        }
        //cambio el color a los th por el color que se ha especificado en el select
        for (var i = 0; i < th.length; i++) {
            th[i].style.color = color.value;
        }

    });


//cambio el tipo de letra de la tabla, por la que se ha especificado en el select
    letras.addEventListener("change", function () {
        tabla.style.fontFamily = letras.value;

    });

//guardo en el localStorage el ultimo tipo de letra y color elegidos en los selects al darle al boton de 
//guardar preferencias
    boton.addEventListener("click", function () {

        localStorage.setItem("ultimo_color", color.value);
        localStorage.setItem("ultima_letra", letras.value);
    });

}

function ultimas_preferencias() {
    //esta función obtiene los últimos valores del color y tipo de letra y los aplica a los elementos
    
    var tabla = document.getElementsByTagName("tbody")[0];
    var enlaces = document.getElementsByTagName("a");
    var th = document.getElementsByTagName("th");
    for (var i = 0; i < enlaces.length; i++) {
        enlaces[i].style.color = localStorage.getItem("ultimo_color");
    }
    for (var i = 0; i < th.length; i++) {
        th[i].style.color = localStorage.getItem("ultimo_color");
    }

    tabla.style.fontFamily = localStorage.getItem("ultima_letra");
}
