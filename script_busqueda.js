var peliculaURL = obtenerBusquedaURL(); //Obtenemos el nombre de la pelicula desde la URL
peliculaURL[1] = peliculaURL[1].replace('+', ' '); //Formateamos los espacios
var pagina = 1; //Página a mostrar, va variando en base a la selección que hacemos desde los botones del .html

mostrarBusqueda(pagina);

/* Función que muestra el resultado de cada página */
function mostrarBusqueda(pag){

    var xhr = new XMLHttpRequest();

    if(pagina <= 1){ pagina = 1; pag = 1; }

    window.scroll(0, 0); //Metodo para volver a la parte superior de la página

    xhr.open('GET', 'https://www.omdbapi.com/?s=' + encodeURI(peliculaURL[1]) + '&page=' + pag + '&apikey=f1480960', true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){ //Listamos todo el contenido de la pelicula buscada
            var contenido = JSON.parse(xhr.responseText);
            for(var i = 0; i<contenido.Search.length; i++){
                document.getElementById("imagen"+i).src = contenido.Search[i].Poster;
                document.getElementById("titulo"+i).innerHTML = contenido.Search[i].Title;
                document.getElementById("anio"+i).innerHTML = contenido.Search[i].Year;
                document.getElementById("clasi"+i).innerHTML = contenido.Search[i].Type;
                document.getElementById("boton"+i).setAttribute("onclick", "location.href='detalle.html?usuario=" + obtenerUsuarioURL() + "&detalle=" + encodeURI(contenido.Search[i].Title) + "'");
            }
        }
    };
    xhr.send();
}



