/********************************************************************
* RESTAURANTE.JS: Modulo Controlador del aplicativo RESTAURANTES.
* Marco Leon Mora, Feb/2018
* ajustes:
* ver.: 1.00
********************************************************************/

var usuario = {};			//Contiene la respuesta de la tabla usuario
var pedidos = {}; 			//consulta para mostrar en jefeCocina 
var detallesPedidoCocina = {}; //Contiene los datos del detalle del pedido para le modulo de jefe de cocina. 
var filaHtml ; 				//Llena las filas 
var claseEstado; 			//Estado en el que se encuentran los productos del pedido
var idCajeroGlobal = 0;
var idMeseroGlobal = 0;  	//Contiene el ID del mesero que ha iniciado sesion
var idPedidoGlobal = 0;
var nombreMeseroGlobal = ""; 
var respuestaGlobal = "";

//****** Llamado desde INDEX, controla modulo a accesar *********************
function iniciarSesion(){
	var user = $('#usuario').val();
	var pass = $('#password').val();
	var parametros = { "opc" : 1, "usuario" : user, "password" : pass};
	ejecutarAjaxJson(parametros,1);
}

/* ejecutarAjaxJson  *********************************************************** 
	* Ejecuta una consulta AJAX en el servidor. Usa el metodo POST 
	* devuelve los datos en formatoJSON 
	* Parametros: datos: arreglo de parametroscon los datos, 
	* llama la funcion leerDatos() para tratar la respuesta
	********************************************************************/
function ejecutarAjaxJson(datos, opc){
	$.ajax({                                      
		type: 'post',
		url:  'php/leerDatos.php',                  
		data: datos,                                       
		//dataType: 'json',                     

	    success : function(response) {
			leerDatos(response, opc);
	    },
	 
	    error : function(xhr, status) {
	    	console.log(' No se pudo realizar la conexión al servidor. ' + status)
	    },	 
	});	
}

function leerDatos(responseJSON, opc){
	var response = JSON.parse(responseJSON);
	switch(opc){
		case 1: //Toma la respuesta de la consulta, verifica el Rol y muestra la pantalla correspondiente
			if(response.length > 0 ){//Si la respuesta trae algo
				//verificar el rol
				if (response[0]["idRol"]==3) {
					usuario = response;
					mostrarVentanaChef1(usuario[0]["nombre"]);	//Envia nombre del empleado
					consultarPedidosCocina();
				}else if (response[0]["idRol"]==4){
					cajero = response;
					setIdCajero(parseInt(cajero[0]["idUsuario"]));
					mostrarVentanaCaja1(cajero[0]["nombre"]); 
					consultarFacturas();
				}else if(response[0]["idRol"]==5){
					mesero = response;
					setIdMesero(parseInt(mesero[0]["idUsuario"])); //Obtenemos el Id del mesero que ha iniciado sesion y lo almacenamos en la variable global  'idMeseroGlobal'
					setNombreMesero(mesero[0]["nombre"]); //obtenemos el nombre del mesero
					navegar(1);
				}
			}
		break;
		case 2:
			if(response.length > 0 ){//Si la respuesta trae algo
				pedidos = response;
				tablaCocina(pedidos);
			}
		break;
		case 3: 
			if(response.length > 0) { 
				detallesPedidoCocina = response;
				tablaDetalleCocina(detallesPedidoCocina);
			}else
			{
				$(".modal-body").html("");
			}
		break;
		case 4:
			if (response["ok"] == "actualizo") {
				//consultarPedidosCocina();
			}else{
				console.log("Error "+ response);
			}
		break;
		case 6:
			if (response["ok"] == "actualizo") {
				consultarPedidosCocina();
			}else{
				console.log("Error "+ response);
			}
		break;
		case 10:
			 if (response.length > 0) {
			 	facturas = response;
			 	tablaCaja(facturas);

			 }else if (response.length == 0){
					$('#cont_centro').html('<h1>No hay pedidos por facturar</h1>');
			}
		break;
		case 11:
			if (response.length>0) {
				cargarDatosPedidoCaja(response,getIdPedido(),getIdCajero());
			}
		break;
		case 12:
			//Respuesta al generar la factura
			if (response["ok"] == "actualizo") {
				console.log("nueva factura");

			}else{
				console.log("no registro factura");
			}
		break;
		case 13:
			if (response["ok"] == "actualizo") {
				console.log("cambio estado pedido");

			}else{
				console.log("NO CAMBIO ESTADO PEDIDO DESPUES DE FACTURAR");
			}
		break;

		/**********************Respuestas del modulo del mesero************************/
		case 20:
			if (response.length > 0 ) {
				pedidosMesero = response;
				cargarTablaPedidosMesero(pedidosMesero);
			}
		break;
		case 21:
			if (response.length > 0) {
				mesasDisponibles = response;
				cargarTablaMesasDisponibles(mesasDisponibles);
			}
		break;

		case 22:
			if (response.length > 0) {
				$('#ultimoPedido').text('Pedido N° '+response[0]["idPedido"]);
				setIdPedido(response[0]["idPedido"]);
			} 
		break;

		case 24:
			if (response.length > 0) {
				crearInterfazCategoria(response);
				/*consultarUltimoPedido();*/
			}
		break;


		case 26:
			if(response.length > 0){
				setRespuestaGlobal(response);
				navegar(5);
				//mostrarProductosMesero(response);
			}
		break;

		case 27:
			if (response["ok"] == "actualizo") {
				navegar(3);

			}else{
				console.log("NO REGISTRO PRODUCTO");
			}
		break;

		case 28:
			//if(response.length > 0){
				mostrarVentanaProductoPedidoMesero(response);
			//}
		break;

	}
}

/******************** obtener y asignar valores de variables globales ***********************************/

//Asigna a la variable global idPedidoGlobal el numero del pedido
function setIdPedido(numPedido){
	idPedidoGlobal = numPedido;
}

//Asigna a la variable global idCajeroGlobal el numero del Cajero que ha iniciado sesion
function setIdCajero(numCajero){
	idCajeroGlobal = numCajero;
}

//	Devuelve el idCajero que inicio Sesion
function getIdCajero(){
	return idCajeroGlobal;
}

function getIdPedido(){
	return idPedidoGlobal;
}

//	Devuelve el idMesero que inicio Sesion
function getIdMesero(){
	return idMeseroGlobal;
}

function setIdMesero(numMesero){
	idMeseroGlobal = numMesero;
}

//	Devuelve el nombreMesero que inicio Sesion
function getNombreMesero(){
	return nombreMeseroGlobal;
}

function setNombreMesero(nomMesero){
	nombreMeseroGlobal = nomMesero;
}

function getRespuestaGlobal(){
	return respuestaGlobal;
}

function setRespuestaGlobal(response){
	respuestaGlobal = response;

}

/******************** ACCIONES DE Consulta  ***************************************************/
function consultarPedidosCocina(){
	var parametros = { "opc" : 2};
	ejecutarAjaxJson(parametros,2);
}

function consultarDatosDetalleCocina(idPedido){
	var parametros = { "opc" : 3 , "idPedido" : idPedido };
	ejecutarAjaxJson(parametros,3);
}


function tablaCocina(filasArreglo){
	//Llenado de filas html
	var fila = "<table class='table table-hover table-striped'>";
	fila +='<thead><tr><th>#</th><th>Mesero</th><th>Mesa</th><th>Demora</th><th>Estado</th></tr></thead>';
	fila += "<tbody>";
	for (var i = 0; i < filasArreglo.length; i++) {

		var estado = parseInt(filasArreglo[i]["idEstado"]);
		var claseEstado = nombrarEstado(estado);

		fila +="<tr><td>"+ filasArreglo[i]["idPedido"] +"</td><td>"+ filasArreglo[i]["nombre"] +"</td><td>"+ filasArreglo[i]["numMesa"] +"</td><td>"+ filasArreglo[i]["fechaPedido"] +"</td><td><button class='btn btn-"+claseEstado+" btnAncho '  onclick='mostrarVentanaPedidoCocina("+ filasArreglo[i]["idPedido"]+")'>"+ claseEstado+"</button></td></tr>";
	}
		fila +='</tbody></table>';
		$('#cont_centro').html(fila);
	//	return filaHtml;
}


function tablaDetalleCocina(filasArreglo){
	//fila = '<h5>Pedido Nº '+ filasArreglo[0]["idPedido"] +'</h5>';
	 var  fila = '<table class="table table-hover table-striped">';
	fila +='<thead><tr><th>Producto</th><th>Cant.</th><th>Estado</th></thead><tbody>';

	for (var i = 0; i < filasArreglo.length; i++){


		var estado = filasArreglo[i]["estado"] ;
		var claseEstado = estado.replace(" ","");

		fila += '<tr><td>'+filasArreglo[i]["nombre"]+'</td><td>'+filasArreglo[i]["cantidad"]+'</td><td  ><div class="btn-group btnAncho"><button id="btnTd'+filasArreglo[i]["numero"]+'" type="button" class="btn btn-'+claseEstado+' btnAncho">'+claseEstado+'</button><button type="button" class="btn btn-'+claseEstado+'" id="flecha'+filasArreglo[i]["numero"]+'" dropdown-toggle dropdown-toggle-split " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-triangle-bottom"></span></button><div class="dropdown-menu"><button class="dropdown-item btn-block btn-EnEspera" onclick="cambiarEstadoProducto(2,'+filasArreglo[i]["numero"]+','+filasArreglo[i]["idPedido"]+')" >En espera</button><button class="dropdown-item btn-block btn-Preparando" onclick="cambiarEstadoProducto(3,'+filasArreglo[i]["numero"]+','+filasArreglo[i]["idPedido"]+')" >Preparando</button><button class="dropdown-item btn-block btn-Preparado" onclick="cambiarEstadoProducto(4,'+filasArreglo[i]["numero"]+','+filasArreglo[i]["idPedido"]+')">Preparado</button><button class="dropdown-item btn-block btn-Entregado" onclick="cambiarEstadoProducto(5,'+filasArreglo[i]["numero"]+','+filasArreglo[i]["idPedido"]+')">Entregado</button> </div></div></td> ';		
		
	}
		fila +='</tbody></table>';
		$('.modal-body').html(fila);

}

function nombrarEstado(idEstado){
	switch(idEstado){

		case 2: 
			nombreEstado = "EnEspera";
		break;
		case 3: 
			nombreEstado = "Preparando";
		break;

		case 4: 
			nombreEstado = "Preparado";
		break;
		case 5: 
			nombreEstado = "Entregado";
		break;
	}

	return nombreEstado;
}


//****** MOSTRAR VENTANAS **************************************************
function mostrarVentanaChef1(nombre){
	var txt= forPantallaChef1('COCINA', nombre);
	/*consultarPedidosCocina()
	txt += filaHtml;*/
	$('#contenedor').html(txt);
	$('#contenedor').append(cargarModalCocina());//Agrega HTML del formulario modal
	nav = 1;	//no. de ventana de modulo mesero
}

function mostrarVentanaCaja1(nombreCajero){
	var txt= forPantallaCaja1('CAJA', nombreCajero);
	$('#contenedor').html(txt);
	$('#contenedor').append(cargarModalCaja());//Agrega HTML del formulario modal
	nav = 2;	//no. de ventana de modulo mesero
}

function mostrarVentanaMesero1(){
	var txt= forPantallaMesero1('MESERO', getNombreMesero());
	$('#contenedor').html(txt);
}

//Despliega datos de un pedido en la ventana modal ***********************
function mostrarVentanaPedidoCocina(idPedido){
	$(".modal-title").html('Datos del Pedido No. '+ idPedido);
	//$(".modal-body").html(cargarDatosPedidoCocina(idPedido));
	consultarDatosDetalleCocina(idPedido);
	$("#myModal").collapse('show');  
}

//Despliega datos de un pedido en la ventana modal ***********************
function mostrarVentanaPedidoCaja(idPedido){
	setIdPedido(idPedido);
	$(".modal-title").html('Datos del Pedido No. '+ idPedido);
	consultarDetalleFactura(idPedido);
	//cargarDatosPedidoCaja(idPedido);
	$("#myModal").collapse('show');  
}

//Despliega ventana  hacer pedido nuevo, asignar mesa ***********************
/** PENDIENTE FALTA REVISAR*/
function mostrarVentanaNuevoPedido(){
	$("#cont_centro").html(forPantallaAsignarMesa());
	nav = 31;	//no. de ventana de modulo mesero
}

//Despliega tabla con items de un pedido, al mesero ***********************
function mostrarPedidoMesero(idPedido){
	$("#cont_centro").html(tablaPedidoMesero(idPedido));
	nav = 32;	//no. de ventana de modulo mesero
}

//Modulo de Navegacion, presenta pantalla anterior a la actual **************
function navegar(nav){
	switch (nav){
		case 1:
			mostrarVentanaMesero1();
			consultarPedidosMesero();
		break;
		case 2:
			consultarMesasDisponibles();
		break;
		case 3:
			consultarProductosPedido(getIdPedido());
		break;
		case 4:
			mostrarVentanaCategorias();
		break;
		case 5:
			mostrarProductosMesero(getRespuestaGlobal());
		break;
		case 6:
			mostrarDetalleProducto();
		break;

	}
}

//Cierra el formulario modal **********************************************
function cerrarModal(){
	$("#myModal").collapse('hide');
}

//***********************************************************************
/*function imprimirFactura(){

}
*/


/* cambia el estado del producto en la interfaz detallePedido del jefe de cocina*/
function cambiarEstadoProducto(idEstado, idNumProducto,idPedido){
	removerClases(idNumProducto);
	switch(idEstado){
		case 2://En Espera
			asignarClases("EnEspera",idEstado,idNumProducto,idPedido);
			break;
		case 3://Preparando
			asignarClases("Preparando",idEstado,idNumProducto,idPedido);
			break; 
		case 4://Preparado
			asignarClases("Preparado",idEstado,idNumProducto,idPedido);
			break;
		case 5://Entregado
			asignarClases("Entregado",idEstado,idNumProducto,idPedido);
			break;
	}
}

/* Asigna las clases al dropdown de tabla detalla pedido de la interfaz del Jefe de cocina*/
function asignarClases(clase,idEstado,idNumProducto,idPedido){
	$('#btnTd'+idNumProducto).toggleClass("btn-"+clase);
	$('#flecha'+idNumProducto).toggleClass("btn-"+clase);

	if (clase =="EnEspera") {
		clase = clase.replace("nE", "n E");
		$('#btnTd'+idNumProducto).text(clase);
	}else{
		$('#btnTd'+idNumProducto).text(clase);
	}

	var parametros = {"opc" : 4, "idEstado": idEstado, "numero" : idNumProducto};
	ejecutarAjaxJson(parametros,4);
	parametros = "";
	parametros = {"opc" : 6, "idPedido": idPedido}
	ejecutarAjaxJson(parametros,6);
}


/* Remueve las clases que se encuentren en el dropdown de la tablaDetallePedido 
	de las interfaz del jefe de cocina para poder asignar una nueva  */
function removerClases(idNumProducto){
	$('#btnTd'+idNumProducto).removeClass("btn-EnEspera");
	$('#btnTd'+idNumProducto).removeClass("btn-Preparando");
	$('#btnTd'+idNumProducto).removeClass("btn-Preparado");
	$('#btnTd'+idNumProducto).removeClass("btn-Entregado");
	$('#flecha'+idNumProducto).removeClass("btn-EnEspera");
	$('#flecha'+idNumProducto).removeClass("btn-Preparando");
	$('#flecha'+idNumProducto).removeClass("btn-Preparado");
	$('#flecha'+idNumProducto).removeClass("btn-Entregado");
}



/***********MODULO DE CAJA ****************
/consultas del modulo de caja 
******************************************/
function consultarFacturas(){
	var parametros = { "opc" : 10};
	ejecutarAjaxJson(parametros,10);
}

function consultarDetalleFactura(idPedido){
	var parametros = {"opc" : 11, "idPedido" : idPedido};
	ejecutarAjaxJson(parametros,11);
}

function tablaCaja(filasFactura){
	//Llena las filas de HTML 
	var fila = '<table class="table table-hover table-striped">';
	fila += '<thead><tr><th># Pedido</th><th>Mesa </th><th>Estado</th><th>Ver</th></tr></thead>';
	fila += '<tbody>';
	for (var i =0; i< filasFactura.length; i++) {
		fila += '<tr><td>'+filasFactura[i]["idPedido"]+'</td><td>'+filasFactura[i]["numMesa"]+'</td><td>'+filasFactura[i]["estado"]+'</td><td><button class="btn btnVerCaja" onclick="mostrarVentanaPedidoCaja('+filasFactura[i]["idPedido"]+')">Ver</button></td></tr>';
	}
	fila += '</tbody></table>';
	$('#cont_centro').html(fila);
}



//Funcion auxiliar para dar formato a valores numericos ***/

var formatter = new Intl.NumberFormat('en-US', {
	style:'currency',
	currency: 'USD',
	miniumFractionDigits: 2,

});



/*************************MODULO DE MESERO***********************
Consultas del modulo del mesero
**************************************************************/

function consultarPedidosMesero(){
	var parametros = {"opc" : 20, "idMesero" : getIdMesero()};
	ejecutarAjaxJson(parametros, 20);
}

function cargarTablaPedidosMesero(pedidosMesero){
	//Llena las filas de HTML 
	var fila = '<table class="table table-hover table-striped">';
	fila += '<thead><tr><th># Pedido</th><th># Mesa </th><th>Estado</th><th>Ver</th></tr></thead>';
	fila += '<tbody>';
	for (var i =0; i< pedidosMesero.length; i++) {

		estado = pedidosMesero[i]["estado"];
		claseEstado = estado.replace("n E", "nE");

		fila += '<tr><td>'+ pedidosMesero[i]["idPedido"] +'</td><td>'+ pedidosMesero[i]["numMesa"] +'</td><td class="btn-'+ claseEstado+'">'+ pedidosMesero[i]["estado"] +'</td><td><button class="btn btn-block" onclick="consultarProductosPedido('+ pedidosMesero[i]["idPedido"] +')"><span class="glyphicon glyphicon-fullscreen"></span></button></td></tr>';
	}
	fila += '</tbody></table>';
	$('#cont_centro').html(fila);
}

function consultarMesasDisponibles(){
	var parametros = { "opc" : 21};
	ejecutarAjaxJson(parametros,21);
}

function cargarTablaMesasDisponibles(mesasDisponibles){
	var fila = '<h3>MESAS DISPONIBLES</h3><table class="table table-hover table-striped">';
	fila += '<thead><tr><th>Mesas Disponibles</th><th>Capacidad</th><th>Asignar</th></tr></thead>';
	fila += '<tbody>';
	for (var i =0; i< mesasDisponibles.length; i++) {
		fila += '<tr><td>'+ mesasDisponibles[i]["numMesa"] +'</td><td>'+ mesasDisponibles[i]["capacidad"] +'</td><td><button id="btnNuevoPedido" class="btn btn-block" onclick="generarNuevoPedido('+mesasDisponibles[i]["numMesa"]+','+getIdMesero()+')"><span class="glyphicon glyphicon-plus"></span></button></td></tr>';
	}
	fila += '</tbody></table>';
	$('#cont_centro').html(fila);

	var btn = '<button class="btn btn-block btnSur" onclick="navegar(1)"><span class="glyphicon glyphicon-chevron-left"></span> Volver a Menú Pedidos</button>';
	$('#cont_sur').html(btn);
}

function generarNuevoPedido(numMesa,idMesero){
	navegar(4);
	//Enviamos los parametros para ejecutar el procedimiento almacenado
	var parametros = {"opc" : 22, "numMesa" : numMesa , "idMesero" : idMesero};
	ejecutarAjaxJson(parametros, 22);
}

function mostrarVentanaCategorias() {
	consultarCategorias();
}

function consultarUltimoPedido(){
	var parametros ={"opc": 25, "idMesero": getIdMesero()};
	ejecutarAjaxJson(parametros,25);
}

function consultarCategorias(){
	var parametros = {"opc": 24 };
	ejecutarAjaxJson(parametros, 24 );
}

function crearInterfazCategoria(categorias){
	var txt = '<h3 id="ultimoPedido">PEDIDO N° </h3>';
		txt += '<div id="categorias">';
		for (var i = 0; i< categorias.length; i++) {
			txt += '<button class="btn btnCategoria" onclick="consultarProductosCategoria('+categorias[i]["idCategoria"]+')">'+categorias[i]["nombre"]+'</button>';
		}
	txt += '</div>';
	$('#cont_centro').html(txt);
	var btn = '<button class="btn btn-block btnSur" onclick="navegar(1)"><span class="glyphicon glyphicon-chevron-left"></span> Volver a Pedidos</button>';
	$('#cont_sur').html(btn);

	$('#ultimoPedido').text('Pedido N° '+getIdPedido());
}


function consultarProductosCategoria(idCategoria){
	var parametros ={"opc": 26, "idCategoria" : idCategoria};
	ejecutarAjaxJson(parametros,26);
}


function mostrarProductosMesero(productos){
	var fila = '<h3>Pedido # '+ getIdPedido() +'<table class="table table-hover table-striped">';
	fila += '<thead><tr><th>Producto</th><th>Precio</th><th>Seleccionar</th></tr></thead>';
	fila += '<tbody>';
	for (var i =0; i< productos.length; i++) {
		var nombreProducto = "'"+ productos[i]["nombre"] +"'";
		fila += '<tr><td>'+ productos[i]["nombre"] +'</td><td>'+ productos[i]["precio"] +'</td><td><Button class="btn btn-block" onclick="mostrarDetalleProducto('+ productos[i]["idProducto"] +','+ nombreProducto +','+ productos[i]["precio"] +')">Seleccionar</button></td></tr>';
	}
	fila += '</tbody></table>';
	$('#cont_centro').html(fila);

	var btn = '<button class="btn btn-block btnSur" onclick="navegar(4)"><span class="glyphicon glyphicon-chevron-left"></span> Volver a Categorias </button>';
	$('#cont_sur').html(btn);
}


//MUESTRA LA INTERFAZ DEL DETALLE DEL PRODUCTO (NOMBRE,PRECIO Y CANTIDAD)
function mostrarDetalleProducto(idProducto,nombre,precio){
	var nombreImg = nombre.replaceAll(" ",""); //Quitamos los espacios que trae el nombre para asi buscar la imagen 
	var txt = '<h3>Pedido # '+ getIdPedido() +'<div id="imgProducto">';
	txt+= '<img src="IMG/'+nombreImg+'.png">';
	txt+= '</div>';

	txt += '<div id="detalleProducto">';
	txt += 		'<div id="detallePrecioProducto">';
	txt += 			'<h3 id="nombreProducto" class="col-xs-12 col-lg-12 col-md-12">'+nombre+'</h3>';
	txt += 			'<h4 id="precioProducto" class="col-xs-12 col-lg-12 col-md-12">'+precio+'</h4>';
	txt += 		'</div>';
	txt += 	'</div>';
	txt += 	'<div id="cantidadProducto">';
	txt += 		'<button class="btnSur" onclick="aumentarCant('+ precio +')"><span class="glyphicon glyphicon-triangle-top"></span></button>';
	txt += 		'<input type="number" class="" text="1" id="cantProducto" name="cantidadProducto" placeholder="Cant.">';
	txt += 		'<button class="btnSur" onclick="disminuirCant('+ precio +')"><span class="glyphicon glyphicon-triangle-bottom"></span></button>';
	txt += '</div>';
	txt += 	'<h3 id="totalProducto">...</h3>'
	$('#cont_centro').html(txt);

	var btn = '<button class="btn  btnSur " onclick="navegar(4)"><span class="glyphicon glyphicon-chevron-left"></span> Volver a categorias </button> ';
	btn += '<button class="btn  btnSur" onclick="agregarProductoPedido('+ idProducto +')"> Agregar al pedido </button> ';
	$('#cont_sur').html(btn);
	$('#totalProducto').text(precio);

	$('#cantProducto').val("1");
}


function aumentarCant(precio){
	cantidad = $('#cantProducto').val();
	cantidad = parseInt(cantidad) + 1;
	precio = cantidad * parseInt(precio);
	$('#totalProducto').text(precio);
	$('#cantProducto').val(cantidad);
}

function disminuirCant(precio){
	cantidad = $('#cantProducto').val();
	if (cantidad > 1) {
		cantidad = parseInt(cantidad) - 1;
		precio = cantidad * parseInt(precio);
		$('#totalProducto').text(precio);
		$('#cantProducto').val(cantidad);
	}
}

//Envia los parametros para realizar la insercion en la BD del producto al pedido
function agregarProductoPedido(idProducto){
	cantidad = $('#cantProducto').val();
	valor = $('#totalProducto').text();
	var parametros = {"opc" : 27, "idPedido" : getIdPedido(), "idProducto" : idProducto, "cantidad" : cantidad, "valor" : valor };
	ejecutarAjaxJson(parametros,27);
}

function consultarProductosPedido(idPedido){
	setIdPedido(idPedido);
	var parametros = { "opc" : 28, "idPedido" : idPedido};
	ejecutarAjaxJson(parametros, 28);
}

function mostrarVentanaProductoPedidoMesero(productos){
	var fila = '<h3>Pedido # '+ getIdPedido() +'</h3><table class="table table-hover table-striped">';
	fila += '<thead><tr><th>PRODUCTO</th><th>CANTIDAD</th><th>ESTADO</th></tr></thead>';
	fila += '<tbody>';
	for (var i =0; i< productos.length; i++) {
		estado = productos[i]["estado"].replace(" ","");
		fila += '<tr><td>'+ productos[i]["nombre"] +'</td><td>'+ productos[i]["cantidad"] +'</td><td><button class="btn btn-block btn-'+ estado +'">'+ productos[i]["estado"] +'</button></td></tr>';
	}
	fila += '</tbody></table>';
	$('#cont_centro').html(fila);
	var btn = '<button class="btn btnSur" onclick="navegar(1)"><span class="glyphicon glyphicon-chevron-left"></span> Volver a Pedidos</button>';
	btn += '<button class="btn  btnSur" onclick="consultarCategorias('+ getIdPedido()+')"> Agregar Productos</button> ';
	$('#cont_sur').html(btn);
}


//Funcion para remplazar un caracter en toda una cadena
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};