//************************************************//
//			MODULO ADMINISTRADOR 	
/*************************************************/

function mostrarModuloAdmin(nombre){

	var txt = forEncabezado("ADMINISTRADOR",nombre);

	txt += '<div id="cont_centro">';


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

	var txt = '<h1>REGISTRAR USUARIO </h1>';

    $("#titulo").html(txt); 

    var txt1 = '<form method="post">';
    txt1 += '<div>';
    txt1 += 	'<label for="Nombre">Usuario:</label>';
    txt1 += 	'<input type="text" id="nombre" placeholder="Escriba Nombre de Usuario" />';
    txt1 += '</div>';
    txt1 += '<div>';
    txt1 += 	'<label for="contrasenia">Contraseña:</label>';
    txt1 += 	'<input type="password" id="contrasenia" placeholder="Escriba Contraseña" />';
    txt1 += '</div>';
    txt1 += '<div>';

    txt1 += '<div class="btn-group">';
    txt1 += '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Rol <span class="glyphicon glyphicon-triangle-bottom"></span></button>';
    txt1 += '	<div class="dropdown-menu">';
    txt1 += '	<li><a href="#">ADMINISTRADOR</a></li>';
    txt1 += '	<li><a href="#">JEFE DE COCINA</a></li>';
    txt1 += '	<li><a href="#">MESERO</a></li>';
    txt1 += '<li><a href="#">CAJERO</a></li>';
   txt1 += '</div>';   
   txt1 += '</div>';
    txt1 += '</form>';
	
    $("#trabajoCentro").html(txt1); 

    var txt2 = '<div>';
    txt2 += '	<button id="btnRegistrar" class="btn" type="button">REGISTRAR</button>';
    txt2 += ' </div>';

    $("#trabajoSur").html(txt2); 
}

  
function AgregarCategoria(){

	var txt = '<h1>AÑADIR NUEVA CATEGORIA</h1>';

    $("#titulo").html(txt); 

    var txt1 = '<form method="post">';
    txt1 += '<div>';
    txt1 += 	'<label for="categoria">Nombre de la categoria:</label>';
    txt1 += 	'<input type="text" id="nomCategoria" placeholder="Escriba el nombre de la categoria"/>';
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

    var txt1 = '<form method="post">';
    txt1 += '<div>';
    txt1 += 	'<label for="producto">Nombre del producto:</label>';
    txt1 += 	'<input type="text" id="producto" placeholder="Escriba Nombre del producto" />';
    txt1 += '</div>';
    txt1 += '<div>';
    txt1 += 	'<label for="precio">Precio:</label>';
    txt1 += 	'<input type="number" id="precio" placeholder="Escriba precio el producto" />';
    txt1 += '</div>';
    txt1 += '<div>';

    txt1 += '<div class="btn-group">';
    txt1 += '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Categoria <span class="glyphicon glyphicon-triangle-bottom"></span></button>';
    txt1 += '	<div class="dropdown-menu">';
    txt1 += '	<li><a href="#">PLATOS</a></li>';
    txt1 += '	<li><a href="#">BEBIDAS</a></li>';
   txt1 += '</div>';   
   txt1 += '</div>';
    txt1 += '</form>';
	
    $("#trabajoCentro").html(txt1); 

    var txt2 = '<div>';
    txt2 += '	<button id="btnAgregar" class="btn" type="button">AÑADIR</button>';
    txt2 += ' </div>';

    $("#trabajoSur").html(txt2); 
}

  
  
    
    
    
    
      
      
      
    
 