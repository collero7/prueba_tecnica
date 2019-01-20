/* Función para validar que el resultado de todas las funciones son correctas */
function validarRegistro(){
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var divNombre = document.getElementById("divNombre");
    var divApellidos = document.getElementById("divApellidos");
    var okNombre = validarNombreApellidos(nombre, divNombre, 0);
    var okApellidos = validarNombreApellidos(apellidos, divApellidos, 1);
    var okCorreo = validarCorreo();
    var okContrasena = validarContrasena(3);
    var ok = false;
    if(okNombre && okApellidos && okCorreo && okContrasena){ //Si todas las comprobaciones son correctas
      registrarUsuario(); //Llamamos a la funcion para registrar el usuario
      ok = true;
    }
    return ok;
}


/* Función para registrar el usuario */
function registrarUsuario(){

  var usuario = document.getElementById("nombre").value; //Para escapar/convertir caracteres extraños
  var contrasena = btoa(document.form.password.value); //Codificamos la contraseña en base64
  document.form.password.value = contrasena; //Mostramos la contraseña codificada
  var ok = true;

  usuario = escape(usuario);
  for(var i = 0; i<sessionStorage.length; i++){ //Recorremos todas las sessions de usuarios

    var usuarioSesion = sessionStorage.key(i);
        if(usuarioSesion === usuario){ //Si ya existe el usuario
           alert("El usuario ya existe");
           ok = false;
           break;
        }
  }

  if(ok == true){ //Si todo es correcto
	sessionStorage.setItem(usuario, contrasena); //Creamos la sesion para registrar al usuario
  }

}