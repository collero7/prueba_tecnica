
/* Función para validar nombre y aoellidos*/
function validarNombreApellidos(valorIntroducido, div, posicion){
    var ok;
    var msgError = "";
    var error = document.getElementsByClassName("error")[posicion];

    div.style.border = "";
    error.innerHTML = "";

    if(valorIntroducido.length === 0){ // Comprobamos que el campo no esté vacío 
        ok = false;
        msgError = "Este campo no puede estar vacío";
    }
    else{

        if(/^\s+$/.test(valorIntroducido)){  // Comprobamos que no esté compuesto sólo por esapcios en blanco
             ok = false;
             msgError = "Este campo no puede contener sólo espacios en blanco";
        }
        else{

            if(/^\d+$/.test(valorIntroducido)){ // Comprobamos que no sea un número
              ok = false;
              msgError = "Este campo no puede ser un número";
            }
            else{

                if(/^[a-zA-Z]+$/.test(valorIntroducido)){ // Si está compuesto por letras nada más, le damos el ok.
                  ok = true;
                }
                else{
                   ok = false;
                   msgError = "Este campo sólo admite texto";
                }
            }
        }
    }

    if(!ok){

       div.style.border = "2px solid red";
       error.innerHTML = msgError;
    }

    return ok;
}



/* Función para validar el correo */
function validarCorreo(){

  var ok;
  var msgError = "";
  var correo = document.getElementById("email").value;
  var divCorreo = document.getElementById("divEmail");
  var error = document.getElementsByClassName("error")[2];

  divCorreo.style.border = "";
  error.innerHTML = "";

    if(correo.length === 0){ // Comprobamos que el campo no esté vacío 
        ok = false;
        msgError = "Este campo no puede estar vacío";
    }
    else{
      var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Definimos una variable con la expresión regular para validar correos

      if (!expr.test(correo)){ //Si el correo introducido no es correcto
        ok = false;
        msgError = "Introduce un correo valido. Ej: pedro@gmail.com"; //Se indica al usuario
      }
      else{
        ok = true;
      }
  }

  if(!ok){

    divCorreo.style.border = "2px solid red";
    error.innerHTML = msgError;
  }

  return ok;
}



/* Función validar contraseña */
function validarContrasena(pos){
    var ok;
    var msgError = "";
    var contrasena = document.getElementById("contrasena").value;
    var divContrasena = document.getElementById("divContrasena");
    var error = document.getElementsByClassName("error")[pos];

    divContrasena.style.border = "";
    error.innerHTML = "";

    if(contrasena.length === 0){ // Comprobamos que el campo no esté vacío 
        ok = false;
        msgError = "Este campo no puede estar vacío";
    }
    else{

        if(/^\s+$/.test(contrasena)){ // Comprobamos que no esté compuesto sólo por esapcios en blanco
             ok = false;
             msgError = "Este campo no puede contener sólo espacios en blanco";
        }
        else{
            ok = true;
        }
    }

    if(!ok){

       divContrasena.style.border = "2px solid red";
       error.innerHTML = msgError;
    }

    return ok;
}


/* Función que retorna una película para la página de index.html */
function peliculasIndex(pos){

    var peliculasRandom = ['Harry Potter', 'Star Wars', 'Game of Thrones', 'The Walking Dead', 'Avengers', 'Gladiator', 'Deadpool', 'Iron Man'];

    return peliculasRandom[pos]; //Retornamos el nombre de la película según la posición introducida por parámetro
}



/* Función para obtener el usuario de la URL */
function obtenerUsuarioURL(){

    var paginaUrl = window.location.search.substring(1);
    var variablesUrl = paginaUrl.split('&');

    for (var i = 0; i < variablesUrl.length; i++){

        var usuario = variablesUrl[i].split('=');
        return usuario[1]; //Devolvemos el valor del usuario
    }
}


/* Función para obtener la pelicula buscada desde la URL */
function obtenerBusquedaURL(){

    var paginaUrl = window.location.search.substring(1);
    var variablesUrl = paginaUrl.split('&');
    var result = [];

    for (var i = 0; i < variablesUrl.length; i++){

        var param = variablesUrl[i].split('=');
        result[i] = param[1];
    }

    return result; //Devolvemos el resultado de la película
}


/* Función para verificar que la película introducida en el buscador es correcta */
function verificarBusquedaPelicula(){

    var usuario = document.getElementById("usuario").value = obtenerUsuarioURL(); //Le asignamos el usuario de la URL al campo oculto en el formulario
    var valorBuscado = document.getElementById("buscar").value;
    var ok;
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.omdbapi.com/?t=' + encodeURI(valorBuscado) + '&apikey=f1480960', true);
    xhr.onreadystatechange = function(){
    
        if(xhr.readyState === 4 && xhr.status === 200){

            var contenido = JSON.parse(xhr.responseText); //Contenido de la llamada del servicio

            if(contenido.Response === "False"){ //Si la respuesta de la llamada del servicio es nula
                alert("Pelicula incorrecta");
            }
            else{
                document.formu.submit(); //Redirigimos a la página de búsqueda.html
            }
        }
    };

    xhr.send();

    if(!ok){
       ok = false;
    }

    return ok;
}



/* Función para gestionar los favoritos */
function gestionFavorito(pos){

    var usuario = obtenerUsuarioURL(); //Obtenemos el valor del usuario de la URL
    var ok = true;
    var peliculaTitulo;
    console.log(pos);
    if(pos === undefined){
        peliculaTitulo = escape(document.getElementById("titulo").innerHTML); //Para escapar/convertir caracteres extraños
    }
    else{
        peliculaTitulo = escape(document.getElementById("titulo"+pos).innerHTML); //Para obtener el nombre de la película según la posición en la página de búsqueda.html
    }

    for(var i = 0; i<localStorage.length; i++){ //Bucle que recorre todas los favoritos
        var favObtenido = localStorage.getItem(usuario.concat(i+1));
        if(favObtenido === peliculaTitulo){ //Si la pelicula ya se encuentra añadida para ese usuario
            alert("Ya has añadido la pelicula a favoritos");
            ok = false;
            break;
        }
    }

    if(ok === true){ //Si todo es correcto, creamos el favorito
        crearFavorito(usuario, peliculaTitulo);
	}
}


/* Función para crear favorito */
function crearFavorito(usuario, peliculaTitulo){

    var usuarioLocal;
    var posicion = 1;

    for(i = 0; i<localStorage.length; i++){
        usuarioLocal = localStorage.key(i); //Obtenemos todos los favoritos del localStore
        if(usuarioLocal.substr(0, 4) === usuario.substr(0, 4)){
            posicion = parseInt(usuarioLocal.substr(usuario.length));  //Obtenemos la última posición de la película según el usuario
            posicion += 1; //Añadimos una posición mas
        }
    }

    localStorage.setItem(usuario.concat(posicion), peliculaTitulo); //Guardamos el favorito en el localStorage
}



/* Función para saber el número total de favoritos por ususario */
function numeroFavoritos(){

    var usuario;
    var numero = 0;

    for(i = 0; i<localStorage.length; i++){ //Recorremos todos los favoritos
        usuario = localStorage.key(i); //Obtenemos todos los favoritos
        if(usuario.substr(0, 4) === obtenerUsuarioURL().substr(0, 4)){ //Comprobamos todos los favoritos según el usuario
            numero += 1; //Vamos contando
        }
    }

    return numero;
}


/* Función para obtener los favoritos */
function obtenerFavoritos(){

    var usuario;
    var contenido = [];

    for(i = 0; i<localStorage.length; i++){ //Recorremmos todos los favoritos
        usuario = localStorage.key(i);
        if(usuario.substr(0, 4) === obtenerUsuarioURL().substr(0, 4)){
            contenido.push(unescape(localStorage.getItem(usuario))); //Almacenamos en un array todos los favoritos del usuario
        }
    }
    return contenido;
}


/* Función para mostrar los favoritos */
function mostrarFavoritos(){

var numero = numeroFavoritos(obtenerUsuarioURL()); //Obtenemos el número de favoritos
var xhr = [];

    for(var i = 0; i<numero; i++){
        (function(i){

        xhr[i] = new XMLHttpRequest();
        xhr[i].open('GET', 'https://www.omdbapi.com/?t=' + obtenerFavoritos()[i] + '&apikey=f1480960', true);
        xhr[i].onreadystatechange = function(){
            if(xhr[i].readyState === 4 && xhr[i].status === 200){ //Listamos todo el contenido de la pelicula buscada
                var contenido = JSON.parse(xhr[i].responseText);
                document.getElementById("imagen"+i).src = contenido.Poster;
                document.getElementById("titulo"+i).innerHTML = contenido.Title;
                document.getElementById("anio"+i).innerHTML = contenido.Year;
                document.getElementById("clasi"+i).innerHTML = contenido.Type;
            }
        };
        
        xhr[i].send();
        })(i);
    }
}



/* Función para eliminar los favoritos */
function eliminarFavorito(pos){

    var favorito;
    var usuario;
    var contenido = [];

    for(i = 0; i<localStorage.length; i++){ //Recorremmos todos los favoritos
        usuario = localStorage.key(i);
        if(usuario.substr(0, 4) === obtenerUsuarioURL().substr(0, 4)){
            contenido.push(unescape(localStorage.key(i))); //Almacenamos en un array todos las claves de favorito del usuario
        }
    }

    favorito = contenido[pos]; //Obtenemos la clave del favorito a eliminar
    localStorage.removeItem(favorito); //Eliminamos el favorito

    window.location.href = 'favoritos.html?usuario='+obtenerUsuarioURL(); //Actualizamos la página
}




/* Función para visualizar palicula seleccionada */
function mostrarPelicula(pelicula){

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.omdbapi.com/?t=' + encodeURI(pelicula) + '&apikey=f1480960', true);
    xhr.onreadystatechange = function(){

        if(xhr.readyState === 4 && xhr.status === 200){ //Cuando sufra un cambio mostramos la información en cada campo de la tabla

            var contenido = JSON.parse(xhr.responseText);
            document.getElementById("desc").style.visibility = "visible";
            document.getElementById("ima").src = contenido.Poster;
            document.getElementById("titulo").innerHTML = contenido.Title;
            document.getElementById("anio").innerHTML = contenido.Year;
            document.getElementById("clasi").innerHTML = contenido.Type;
            document.getElementById("gene").innerHTML = contenido.Genre;
            document.getElementById("emi").innerHTML = contenido.Released;
            document.getElementById("dura").innerHTML = contenido.Runtime;
            document.getElementById("direc").innerHTML = contenido.Director;
            document.getElementById("aut").innerHTML = contenido.Writer;
            document.getElementById("idi").innerHTML = contenido.Language;
            document.getElementById("sipn").innerHTML = contenido.Plot;
        }
    };

    xhr.send();
}

