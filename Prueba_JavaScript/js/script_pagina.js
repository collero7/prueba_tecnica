
var xhr = [];

for(var i = 0; i < 8; i++){ //Listamos las películas definidas en la funcion peliculasIndex()
    (function(i){

        xhr[i] = new XMLHttpRequest();
        xhr[i].open('GET', 'https://www.omdbapi.com/?t=' + encodeURI(peliculasIndex(i)) + '&apikey=f1480960', true);

        xhr[i].onreadystatechange = function(){

            if(xhr[i].readyState === 4 && xhr[i].status === 200){

                var contenido = JSON.parse(xhr[i].responseText);
                console.log(contenido);
                document.getElementsByTagName("img")[i].src = contenido.Poster; //Mostramos la imagen de la pelicula
            }
        };

        xhr[i].send();
    })(i);
}



















