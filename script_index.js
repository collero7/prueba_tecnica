/* Función para validar que el resultado de todas las funciones son correctas */
function validarAcceso(){
    var nombre = document.getElementById("nombre").value;
    var divNombre = document.getElementById("divNombre");
    var okNombre = validarNombreApellidos(nombre, divNombre, 0);
    var okContrasena = validarContrasena(1);
    var okVerificar = verificarAcceso();
    var ok = false;
    if(okNombre && okContrasena && okVerificar){ //Si todas las comprobaciones son correctas accedemos
      ok = true;
    }
    return ok;
}


/* Función para verificar el usuario */
function verificarAcceso(){

  var usuario = escape(document.getElementById("nombre").value); //Para escapar/convertir caracteres extraños
  var contrasena = btoa(document.form.password.value); //Codificamos la contraseña en base64
  var error = document.getElementsByClassName("error")[2];
  var ok = false;
  var usuSesion = '', passSesion = '';

  error.innerHTML = "";

  for(var i = 0; i<sessionStorage.length; i++){ //Recorremos todas las sessions de usuarios

    usuSesion = sessionStorage.key(i); //Obtenemos la sesion por posicion
    if(usuSesion === usuario){ //Si ya existe el usuario
       passSesion = sessionStorage.getItem(usuSesion); //Obtenemos la contraseña para ese usuario
       passSesion === contrasena ? ok = true : ok = false; //Comprobamos si existe
       document.form.password.value = '';
    }
  }
  if(!ok){
      error.innerHTML = "Usuario y/o contraseña incorrectos";
  }

  return ok;
}