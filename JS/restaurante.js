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
var idMeseroSocket = 0; 	//Contiene el ID del mesero que va a recibir el mensaje por medio del socket
var nombreMeseroGlobal = ""; 
var respuestaGlobal = "";
var navegarMesero = 0;
var navegarCocina = 0;		//Indica en que ventana se encuentra el Jefe de cocina
var rolUsuario = 0;

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
				if (response[0]["idRol"]==3) {//JefeCocina
					setRolUsuario(response[0]["idRol"]);
					usuario = response;
					mostrarVentanaChef1(usuario[0]["nombre"]);	//Envia nombre del empleado
					consultarPedidosCocina();
				}else if (response[0]["idRol"]==4){//cajero
					setRolUsuario(response[0]["idRol"]);
					cajero = response;
					setIdCajero(parseInt(cajero[0]["idUsuario"]));
					mostrarVentanaCaja1(cajero[0]["nombre"]); 
					consultarFacturas();
				}else if(response[0]["idRol"]==5){//Mesero
					mesero = response;
					setIdMesero(parseInt(mesero[0]["idUsuario"])); //Obtenemos el Id del mesero que ha iniciado sesion y lo almacenamos en la variable global  'idMeseroGlobal'
					setNombreMesero(mesero[0]["nombre"]); //obtenemos el nombre del mesero
					navegar(1);
				}else if (response[0]["idRol"]==2) {
					administrador = response;
					mostrarModuloAdmin(administrador[0]["nombre"]);
				}

				iniciarSocket();
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
				var msg = {
				tipoMensaje: 1,
				idPedido: getIdPedido(),
				idMesero: getIdMeseroSocket()
				};

				websocket.send(JSON.stringify(msg));
				consultarPedidosCocina();
			}else{
				console.log("Error "+ response);
			}
		break;
		case 6:
			if (response["ok"] == "actualizo") {
				consultarPedidosCocina();

				//prueba envio de mensajes con SOCKETS
				//Prepara los datos de JSON
				

				//FIN DE PRUEBA

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

		case 22://Nuevo pedido solicitado por el mesero al seleccionar una mesa
			if (response.length > 0) {
				$('#ultimoPedido').text('Pedido N° '+response[0]["idPedido"]);
				setIdPedido(response[0]["idPedido"]);

				var msg = {
				tipoMensaje: 3,
				idPedido: getIdPedido(),
				idMesero: getIdMesero()
				};

				websocket.send(JSON.stringify(msg));

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
				var msg = {
				tipoMensaje: 3,
				idPedido: getIdPedido(),
				idMesero: getIdMesero()
				};

				websocket.send(JSON.stringify(msg));

			}else{
				console.log("NO REGISTRO PRODUCTO");
			}
		break;

		case 28:
			//if(response.length > 0){
				mostrarVentanaProductoPedidoMesero(response);
			//}
		break;

		case 29:
			if (response["ok"] == "actualizo") {
				navegar(3);

				/*Evia Mensaje al socket para actualizar interfaz de los Jefe de cocina y Cajeros*/

				var msg = {
				tipoMensaje: 3,
				idPedido: getIdPedido(),
				idMesero: getIdMesero()
				};

				websocket.send(JSON.stringify(msg));

			}else{
				console.log("NO CAMBIO ESTADO PEDIDO DESPUES DE FACTURAR");
			}
		break;

		//Modulo Admin
		case 40:
			if (response["ok"] == "actualizo") {
				alert("Usuario Creado");
				limpiarUsuarioAdmon();
			}else{
				console.log("NO CREO EL USUARIO");
			}
		break;

		case 41: //Respuesta de la Consulta de Usuario
			if (response.length > 0) {
				//Si se encuentra registrado en la BD
				alert("Usuario encontrado");
				$("#btnRol").text(response[0]["nombre"].toUpperCase());//Muestra el rol que tenga
				$("#contrasenia").val("");

				//Habilitamos los botones de actualizar,eliminar
				habilitarBotonesUsuario();
			}
			else{
				//No se encuentra registrado
				alert("Usuario no registra");
				document.getElementById("btnRol").disabled  = false;
    			document.getElementById("contrasenia").disabled  = false;
    			document.getElementById("btnRegistrar").disabled  = false;
    			document.getElementById("btnConsultar").disabled  = true;
    			document.getElementById("btnActualizar").disabled  = true;
    			document.getElementById("btnEliminar").disabled  = true;
				//limpiarUsuarioAdmon();

			}
		break;

		case 42://Actualiza
			if (response["ok"] == "actualizo") {
				alert("Usuario Actualizado");

			}else{
				console.log("NO ACTUALIZO USUARIO");
			}
		break;

		case 43://Elimina Usuario
			if (response["ok"] == "actualizo") {
				alert("Usuario ELIMINADO");
				limpiarUsuarioAdmon();
			}else{
				console.log("NO ELIMINO USUARIO");
			}
		break;

		case 44:
			if (response.length > 0) {
				cargarCategorias(response);
			}
		break;

		case 45: //Registrar un nuevo producto con la imagen 
			if (response["ok"] == "actualizo") {
				alert("Producto REGISTRADO");
				    $("#producto").val("");
   					$("#precio").val("");
    				$("#btnCategoria").text("CATEGORIA");
			}else{
				console.log("ERROR! No se registro el producto");
			}
		break;

		case 46:
			if (response.length > 0) {
				cargarTablaProductos(response);
			}
		break;

		case 47: //registra una nueva categoria
			if (response[0]["existen"] == 0) {
				alert("categoria REGISTRADA");
				$("#nomCategoria").val("");
			}else{
				alert("ERROR! No se registro LA CATEGORIA \n Puede que ya existe");
			}

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

function getIdMeseroSocket(){
	return idMeseroSocket;
}

function setIdMeseroSocket(id){
	idMeseroSocket = id;
}

function getRolUsuario(){
	return rolUsuario;
}

function setRolUsuario(rol){
	rolUsuario = rol;
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

		fila +="<tr><td>"+ filasArreglo[i]["idPedido"] +"</td><td>"+ filasArreglo[i]["nombre"] +"</td><td>"+ filasArreglo[i]["numMesa"] +"</td><td>"+ filasArreglo[i]["fechaPedido"] +"</td><td><button class='btn btn-"+claseEstado+" btnAncho '  onclick='mostrarVentanaPedidoCocina("+ filasArreglo[i]["idPedido"]+","+ filasArreglo[i]["idUsuario"]+")'>"+ claseEstado+"</button></td></tr>";
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
		case 6:
			nombreEstado = "Facturado"; 
		break;
		case 7:
			nombreEstado = "Recibido";
		break;
	}

	return nombreEstado;
}


//****** MOSTRAR VENTANAS **************************************************
function mostrarVentanaChef1(nombre){
	navegarCocina = 1;
	console.log("navegarCocina "+navegarCocina);
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
function mostrarVentanaPedidoCocina(idPedido,ideMeseroSocket){
	navegarCocina = 2;
	console.log("navegarCocina "+navegarCocina);
	setIdPedido(idPedido);
	setIdMeseroSocket(ideMeseroSocket);
	$(".modal-title").html('Datos del Pedido No. '+ idPedido);
	//$(".modal-body").html(cargarDatosPedidoCocina(idPedido));
	consultarDatosDetalleCocina(idPedido);
	$("#myModal").collapse('show');  
}

//Despliega datos de un pedido en la ventana modal ***********************
function mostrarVentanaPedidoCaja(idPedido,idMesero){
	setIdPedido(idPedido);
	setIdMeseroSocket(idMesero);
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
			navegarMesero = 1;
			mostrarVentanaMesero1();
			consultarPedidosMesero();
		break;
		case 2:
			navegarMesero = 2;
			consultarMesasDisponibles();
		break;
		case 3:
			navegarMesero = 3;
			consultarProductosPedido(getIdPedido());
		break;
		case 4:
			navegarMesero = 4;
			mostrarVentanaCategorias();
		break;
		case 5:
			navegarMesero = 5;
			mostrarProductosMesero(getRespuestaGlobal());
		break;
		case 6:
			navegarMesero = 6;
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

	var parametros = {"opc" : 4, "idEstado": idEstado, "numero" : idNumProducto, "idPedido": idPedido};
	ejecutarAjaxJson(parametros,4);
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
		fila += '<tr><td>'+filasFactura[i]["idPedido"]+'</td><td>'+filasFactura[i]["numMesa"]+'</td><td>'+filasFactura[i]["estado"]+'</td><td><button class="btn btnVerCaja" onclick="mostrarVentanaPedidoCaja('+filasFactura[i]["idPedido"]+','+filasFactura[i]["idMesero"]+')">Ver</button></td></tr>';
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
		if(estado == "Facturado"){
			fila += '<tr><td>'+ pedidosMesero[i]["idPedido"] +'</td><td>'+ pedidosMesero[i]["numMesa"] +'</td><td class="btn-'+ claseEstado+'">'+ pedidosMesero[i]["estado"] +'</td><td><button class="btn btn-block" onclick="consultarProductosPedido('+ pedidosMesero[i]["idPedido"] +')" disabled><span class="glyphicon glyphicon-fullscreen"></span></button></td></tr>';

		}else{
			fila += '<tr><td>'+ pedidosMesero[i]["idPedido"] +'</td><td>'+ pedidosMesero[i]["numMesa"] +'</td><td class="btn-'+ claseEstado+'">'+ pedidosMesero[i]["estado"] +'</td><td><button class="btn btn-block" onclick="consultarProductosPedido('+ pedidosMesero[i]["idPedido"] +')"><span class="glyphicon glyphicon-fullscreen"></span></button></td></tr>';
		}
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
	navegarMesero = 4;
	//console.log(navegarMesero);
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
	navegarMesero = 6;
	//console.log(navegarMesero);
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
	navegarMesero = 3;
	//console.log(navegarMesero);
	var parametros = { "opc" : 28, "idPedido" : idPedido};
	ejecutarAjaxJson(parametros, 28);
}

function mostrarVentanaProductoPedidoMesero(productos){
	var fila = '<button id="btnActualizarProductosPedido" class="btn" onclick="consultarProductosPedido('+ getIdPedido() +')">Pedido # '+ getIdPedido() +'</button><table class="table table-hover table-striped">';
	fila += '<thead><tr><th>PRODUCTO</th><th>CANTIDAD</th><th>ESTADO</th></tr></thead>';
	fila += '<tbody>';
	for (var i =0; i< productos.length; i++) {
		estado = productos[i]["estado"].replace(" ","");
		if (estado == 'Entregado') { //si el estado es entregado aparece el boton para confirmar que recibe el producto
			fila += '<tr><td>'+ productos[i]["nombre"] +'</td><td>'+ productos[i]["cantidad"] +'</td><td><button class="btn btn-'+ estado +' btnEntregadoMesero">'+ productos[i]["estado"] +'</button><button class="btn btnConfirmarEntrega" onclick="confirmarEntregaProducto('+ productos[i]["numero"] +')"><span class="glyphicon glyphicon-ok"></span></button></td></tr>';
		}else{
			fila += '<tr><td>'+ productos[i]["nombre"] +'</td><td>'+ productos[i]["cantidad"] +'</td><td><button class="btn btn-block btn-'+ estado +'">'+ productos[i]["estado"] +'</button></td></tr>';
		}
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



/***********************************************
	PRUEBA DE CONEXION CON SOCKET
*********************************************/
function iniciarSocket(){
    //Open a WebSocket connection.
    var wsUri = "ws://192.168.254.1:9000/restaurante/php/server.php";   
    websocket = new WebSocket(wsUri); 
    
    //Connected to server
    websocket.onopen = function(ev) {
        alert('Conectado al servidor');
    }
    
    //Connection close
    websocket.onclose = function(ev) { 
        alert('Desconectado');
    };
    
    //Message Receved
    websocket.onmessage = function(ev) { 
        var msg = JSON.parse(ev.data); //PHP envia los datos JSON
        var tipoMensaje = msg.tipoMensaje;
		/*var idePedido = msg.idPedido; //Nombre Usuario
		var ideMesero = msg.idMesero; //Color Asignado al Usuario*/
		console.log("tipoMensaje "+tipoMensaje);
		switch(parseInt(tipoMensaje)){
			case 0: //Mensajes de alerta (Conectado,desconectado,etc.).
				var msj =  msg.message;
				alert(msj);
			break;
			//Los mensaje de tipo 1 son son para los meseros y cajeros (Enviados por el Jefe de cocina)
			case 1:
				var idePedido = msg.idPedido; //Nombre Usuario
				var ideMesero = msg.idMesero; //Color Asignado al Usuario
				if (ideMesero == getIdMesero()) { //Verificamos que el ID del mesero almacenado en el dispositivo sea igual al que debe de recibir el mensaje
					actualizarVentanaMesero();
				}
				if(getRolUsuario() == 4){	//Si el cajero a iniciado sesion
					consultarFacturas();
				}
			break;
			case 2: //Mensajes enviados por el Cajero al generar una factura
				var idePedido = msg.idPedido; //Numero del pedido
				var ideMesero = msg.idMesero; //id Asignado al Usuario
				if(getRolUsuario() == 3){	//Si el cajero a iniciado sesion
					consultarPedidosCocina();
				}
				if (ideMesero == getIdMesero()) { //Verificamos que el ID del mesero almacenado en el dispositivo sea igual al que debe de recibir el mensaje
					actualizarVentanaMesero();
				}
			break;
			case 3: //Mensajes enviado por el mesero para actualizar interfaz del jefe de cocina y/o cajero
			console.log("entra tipo 3");
			console.log("usuario " + getRolUsuario());
				var idePedido = msg.idPedido; //Numero del pedido
				var ideMesero = msg.idMesero; //id Asignado al Usuario
				if(getRolUsuario() == 3){	//Si el jefe de cocina a iniciado sesion
					console.log("switch");
					switch(navegarCocina){
						case 1:
							consultarPedidosCocina();
						break;
						case 2:
							//cerrarModal();
							mostrarVentanaPedidoCocina(idePedido,ideMesero);
							consultarPedidosCocina();
							console.log("entro");
						break;
					}	
				}
				if(getRolUsuario() == 4){
					consultarFacturas();
				}
					
			break;
		}
    };
    
    //Error
    websocket.onerror = function(ev) { 
        alert('Error '+ev.data);
    };
    
}

//Segun la ventana en que se encuentre el mesero, se actualizara (Solo si esta en la ventana 1 o 3)
function actualizarVentanaMesero(){
	switch(navegarMesero){
		case 1: //Se en cuentra en la ventana 1
			navegar(1);
		break;
		case 3:
			navegar(3);
		break;
	}
}

/* 	Ejecuta consulta para cambiar el estado del pedido a "Recibido" cuando el mesero confirma que recibe el producto por parte del jefe de cocina		*/
function confirmarEntregaProducto(numeroProducto){
	/*var parametros = {"opc" : 29, "idPedido" : getIdPedido(), "numeroProducto" : numeroProducto};
	ejecutarAjaxJson(parametros,29);*/
	var parametros = {"opc" : 29, "idEstado": 7, "numero" : numeroProducto, "idPedido": getIdPedido()};
	ejecutarAjaxJson(parametros,29);
}



//CARGA TABLA DE PRODUCTOS EXISTENTES EN MODULO ADMINISTRADOR (PRODUCTOS)

function cargarTablaProductos(response){

	var txt = '<h1>PRODUCTOS</h1>';
    $("#titulo").html(txt); 


	//Llena las filas de HTML 
	var fila = '<table class="table table-hover table-striped">';
	fila += '<thead><tr><th>Nombre</th><th>Precio</th><th>Categoria</th></tr></thead>';
	fila += '<tbody>';
	for (var i =0; i< response.length; i++) {
			fila += '<tr><td>'+response[i]["nombre"]+'</td><td>'+response[i]["precio"]+'</td><td>'+response[i]["nombreCategoria"]+'</td></tr>';

	}
	fila += '</tbody></table>';
	$('#tablaProductos').html(fila);

 	 var txt2 = '<div>';
    txt2 += '	<button id="btnAgregar" class="btn" type="button" onclick="cargarFormProducto()">AÑADIR</button>';
    txt2 += ' </div>';
    $("#trabajoSur").html(txt2);

}