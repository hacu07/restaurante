//************************************************//
//			MODULO ADMINISTRADOR 	
/*************************************************/

function mostrarModuloAdmin(nombre){

	var txt = forEncabezado("ADMINISTRADOR",nombre);
	txt += '<div id="cont_centroAdmin">';
	txt += '<div id="menu" class="col-md-2 col-lg-2 col-sm-2">';
	txt += '<button type=button id="btnUsuario" class="btn btn-block " onclick=registroNuevosUsuarios()>USUARIO</button>';
	txt += '<button type=button id="btnCategorias" class="btn btn-block" onclick=AgregarCategoria()>CATEGORIAS</button>';
	txt += '<button type=button id="btnProductos" class="btn btn-block "onclick=agregarProducto()>PRODUCTOS</button>';
	txt += '<button type=button id="btnEstadisticas" class="btn btn-block ">ESTADISTICAS</button>';
	txt += '</div>';
	txt += '<div id="trabajo" class="col-md-10 col-lg-10 col-sm-10" >';
	txt += '<div id="titulo"></div>';
	txt += '<div id="trabajoCentro">';
	txt += '</div>';
	txt += '<div id="trabajoSur"></div>';
	txt += '</div>';
	txt += '</div>';
	$("#contenedor").html(txt);
}


function registroNuevosUsuarios(){
	var txt = '<h1> USUARIOS </h1>';
    $("#titulo").html(txt); 

    var txt1 = '';    
    txt1 += '<img src="img/registroUsuarios.png" alt="Usuario" id="imgUsuario">';
    txt1 += '<div>';
    txt1 += 	'<label for="Nombre">Usuario:</label>';
    txt1 += 	'<input type="text" id="nombre" placeholder="Escriba Nombre de Usuario" minlength="4"/>';
    txt1 += '</div>';
    txt1 += '<div>';
    txt1 += 	'<label for="contrasenia">Contraseña:</label>';
    txt1 += 	'<input type="password" id="contrasenia" placeholder=" Escriba Contraseña" minlength="4" disabled="true"/>';
    txt1 += '</div>';
    txt1 += '<div>';
    txt1 += '<div class="btn-group" >';
    txt1 += '<button id="btnRol" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled="true"> Rol <span class="glyphicon glyphicon-triangle-bottom"></span></button>';
    txt1 += '	<div class="dropdown-menu">';
    txt1 += '   <button class="btn btn-block btnDropDown" onclick="cambiarTextoRol(\'ADMINISTRADOR\')">ADMINISTRADOR</button>   ';
    txt1 += '   <button class="btn btn-block btnDropDown" onclick="cambiarTextoRol(\'JEFE DE COCINA\')">JEFE DE COCINA</button>  ';
    txt1 += '   <button class="btn btn-block btnDropDown" onclick="cambiarTextoRol(\'MESERO\')">MESERO</button>  ';
    txt1 += '   <button class="btn btn-block btnDropDown" onclick="cambiarTextoRol(\'CAJERO\')">CAJERO</button>    ';
    txt1 += '</div>';   
    txt1 += '</div>';	
    $("#trabajoCentro").html(txt1); 

    var txt2 = '<div>';
    txt2 += '	<button id="btnRegistrar" class="btn" type="button" onclick="registrarNuevoUsuario()" disabled="true">REGISTRAR</button>';
    txt2 += '   <button id="btnConsultar" class="btn" type="button" onclick="consultarUsuarioAdmon()">CONSULTAR</button>';
    txt2 += '   <button id="btnActualizar" class="btn" type="button" onclick="actualizarUsuarioAdmon()" disabled="true">ACTUALIZAR</button>';
    txt2 += '   <button id="btnEliminar" class="btn" type="button" onclick="eliminarUsuarioAdmon()" disabled="true">ELIMINAR</button>';
    txt2 += ' </div>';
    $("#trabajoSur").html(txt2); 
}

  
function AgregarCategoria(){
	var txt = '<h1>AÑADIR NUEVA CATEGORIA</h1>';
    $("#titulo").html(txt); 

    var txt1 = '<form>';
    txt1 += '<div>';
    txt1 += 	'<label for="categoria">Nombre de la categoria:</label>';
    txt1 += 	'<input type="text" id="nomCategoria" placeholder=" Escriba el nombre de la categoria"/>';
    txt1 += '</form>';
    $("#trabajoCentro").html(txt1); 

    var txt2 = '<div>';
    txt2 += '	<button id="btnAgregar" class="btn" type="button">AÑADIR</button>';
    txt2 += ' </div>';
    $("#trabajoSur").html(txt2); 
}

  
function agregarProducto(){
	var txt = '<h1>AÑADIR NUEVO PRODUCTO</h1>';
    $("#titulo").html(txt); 

    var txt1 = '<form>';
    txt1 += '<div>';
    txt1 += 	'<label for="producto">Nombre del producto:</label>';
    txt1 += 	'<input type="text" id="producto" placeholder=" Escriba Nombre del producto" />';
    txt1 += '</div>';
    txt1 += '<div>';
    txt1 += 	'<label for="precio">Precio:</label>';
    txt1 += 	'<input type="number" id="precio" placeholder=" Escriba precio el producto" />';
    txt1 += '</div>';
    txt1 += '<div class="btn-group">';
    txt1 += '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Categoria <span class="glyphicon glyphicon-triangle-bottom"></span></button>';
    txt1 += '   <div class="dropdown-menu">';
    txt1 += '      <li><a href="#">PLATOS</a></li>';
    txt1 += '      <li><a href="#">BEBIDAS</a></li>';
    txt1 += '   </div>';   
    txt1 += '</div>';
    txt1 +='<div>';
    txt1 +='  <form  name="formulario"  action="envio.php" method="post" enctype="multipart/form-data">';
    txt1 +=     '<label for="precio">Insertar Imagen:</label>';
    txt1 +='     <input id="inputInsertarImg" name="archivo" type="file" size="20">';
    txt1 +='  </form>';
    txt1 +='</div>';
    txt1 += '</form>';
    $("#trabajoCentro").html(txt1); 

    var txt2 = '<div>';
    txt2 += '	<button id="btnAgregar" class="btn" type="button">AÑADIR</button>';
    txt2 += ' </div>';
    $("#trabajoSur").html(txt2); 
}


//Cambia el nombre del elemento #btnRol al rol seleccionado en el dropdown 
function cambiarTextoRol(rol){
    $("#btnRol").text(rol); 
}
 
//Toma el nombres, contraseña y rol del nuevo usuario para insertar a la BD    
function registrarNuevoUsuario(){
    var nombre = $("#nombre").val(); //obtiene lo escrito en el campo de nombre
    var contrasenia = $("#contrasenia").val(); //obtiene lo escrito en el campo de contrasenia
    var rol = $("#btnRol").text();

    if (rol == "ADMINISTRADOR") {
        idRol = 2;
    }else if (rol == "JEFE DE COCINA") {
        idRol = 3;
    }else if (rol == "CAJERO") {
        idRol = 4;
    }else if (rol == "MESERO"){
        idRol = 5;
    }

    var parametros = {"opc" : 40, "nombre" : nombre, "contrasenia" : contrasenia, "idRol" : idRol };
    ejecutarAjaxJson(parametros, 40);
}

//Consulta los usuarios en la BD desde el modulo del Administrador, toma solo el valor escrito en el campo de "USUARIO"
function consultarUsuarioAdmon(){
    usuario = $("#nombre").val(); //toma el valor escrito en el campo "USUARIO"
    if (usuario != "") {
        var parametros = {"opc" : 41, "usuario" : usuario};
        ejecutarAjaxJson(parametros,41);
    }else{
        alert("Debe digitar el usuario para consultar");
    }
}

//Limpia lo escrito en los campos del formulario de usuario
function limpiarUsuarioAdmon(){
    $("#nombre").val("");
    $("#contrasenia").val("");
    $("#btnRol").text("ROL");
    document.getElementById("btnRol").disabled  = true;
    document.getElementById("contrasenia").disabled  = true;
    document.getElementById("btnRegistrar").disabled  = true;
    document.getElementById("btnConsultar").disabled  = false;
    document.getElementById("btnActualizar").disabled  = true;
    document.getElementById("btnEliminar").disabled  = true;
}

//Actualiza la contraseña y/o rol del usuario
function actualizarUsuarioAdmon(){
    var nombre = $("#nombre").val(); //obtiene lo escrito en el campo de nombre
    var contrasenia = $("#contrasenia").val(); //obtiene lo escrito en el campo de contrasenia
    var rol = $("#btnRol").text();

    switch(rol){
        case 'ADMINISTRADOR':
            idRol = 2;
        break;
        case 'JEFE DE COCINA':
            idRol = 3;
        break;
        case 'CAJERO':
            idRol = 4;
        break;
        case 'MESERO':
            idRol = 5;
        break;
    }

    //Si la contraseña va vacia solo se actualiza el rol
    var parametros = {"opc" : 42, "nombre" : nombre, "contrasenia" : contrasenia, "idRol" : idRol };
    ejecutarAjaxJson(parametros,42);
}

//Elimina el usuario de la BD tomando el nombre
function eliminarUsuarioAdmon(){
    var nombre = $("#nombre").val(); //obtiene lo escrito en el campo de nombre

    var parametros = {"opc" : 43, "nombre" : nombre};
    ejecutarAjaxJson(parametros, 43);
}


function habilitarBotonesUsuario()
{
    document.getElementById("btnActualizar").disabled  = false;
    document.getElementById("btnEliminar").disabled  = false;
    document.getElementById("btnRol").disabled  = false;
    document.getElementById("contrasenia").disabled  = false;
}