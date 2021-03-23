var peliculaUrl = obtenerBusquedaURL()[1]; //Obtenemos el número de la pelicula seleccionada desde la URL

//var peliculaObtenida = peliculasIndex(peliculaUrl); //Obtenemos el nombre de la película en el Array

mostrarPelicula(decodeURI(peliculaUrl)); //Mostramos información de la película
