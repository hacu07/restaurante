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
	txt += '<button type=button id="btnEstadisticas" class="btn btn-block" onclick=graficasEstadisticas()>ESTADISTICAS</button>';
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


    var txt1 = '<form method="post">';    
    txt1 += '<img src="img/registroUsuarios.png" alt="Usuario" id="imgUsuario">';
    txt1 += '<div>';
    txt1 += 	'<label for="Nombre">Usuario:</label>';
    txt1 += 	'<input type="text" id="nombre" placeholder=" Escriba Nombre de Usuario" />';
    txt1 += '</div>';
    txt1 += '<div>';
    txt1 += 	'<label for="contrasenia">Contraseña:</label>';
    txt1 += 	'<input type="password" id="contrasenia" placeholder=" Escriba Contraseña" />';
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
    txt2 += '   <button id="btnRegistrar" class="btn" type="button">ACTUALIZAR</button>';
    txt2 += '   <button id="btnRegistrar" class="btn" type="button">CONSULTAR</button>';
    txt2 += '   <button id="btnRegistrar" class="btn" type="button">ELIMINAR</button>';

    txt2 += ' </div>';

    $("#trabajoSur").html(txt2); 
}

  
function AgregarCategoria(){

	var txt = '<h1>AÑADIR NUEVA CATEGORIA</h1>';

    $("#titulo").html(txt); 

    var txt1 = '<form method="post">';
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

    var txt1 = '<form method="post">';
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
/*    txt1 +='';
    txt1 +='';
    txt1 +='';
    txt1 +='';
    txt1 +='';

*/

    txt1 += '</form>';
	
    $("#trabajoCentro").html(txt1); 

    var txt2 = '<div>';
    txt2 += '	<button id="btnAgregar" class="btn" type="button">AÑADIR</button>';
    txt2 += ' </div>';

    $("#trabajoSur").html(txt2); 
}


/***************************************************************/
//               GRAFICAS DE ESTADISTICAS
/***************************************************************/

function graficasEstadisticas(){ 

    var txt = '<h1>ESTADÍSTICAS</h1>';

    $("#titulo").html(txt); 



    Highcharts.chart('trabajoCentro', {

    title: {
        text: 'Ventas por mesero diarias'
    },

    subtitle: {
        text: 'Mes: Abril'
    },

    yAxis: {
        title: {
            text: 'ventas por empleado'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Paula',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Lucia',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Lina',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Luis',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Juan',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});

var txt2 = '<div>';
    txt2 += '   <button id="btnRegistrar" class="btn" type="button">MENSUALES</button>';
    txt2 += '   <button id="btnRegistrar" class="btn" type="button">SEMANALES</button>';
    txt2 += ' </div>';

    $("#trabajoSur").html(txt2); 
}

         

 

