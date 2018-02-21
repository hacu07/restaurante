/********************************************************************
* RESTAURANTE.JS: Modulo Controlador del aplicativo RESTAURANTES.
* Marco Leon Mora, Feb/2018
* ajustes:
* ver.: 1.00
********************************************************************/
var nav = 1;				//Controla la navegacion entre pantallas. 1: Inicial
var usuario = {};			//Contiene la respuesta de la tabla usuario
var pedidos = {}; 			//consulta para mostrar en jefeCocina 
var detallesPedidoCocina = {}; //Contiene los datos del detalle del pedido para le modulo de jefe de cocina. 
var filaHtml ; 				//Llena las filas 
var claseEstado; 			//Estado en el que se encuentran los productos del pedido


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
				console.log("si Modifico");

			}else{
				console.log("Error "+ response);
			}

		break;
		case 5:

		break;
		}

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

		fila +="<tr><td>"+ filasArreglo[i]["idPedido"] +"</td><td>"+ filasArreglo[i]["nombre"] +"</td><td>"+ filasArreglo[i]["numMesa"] +"</td><td>"+ filasArreglo[i]["fechaPedido"] +"</td><td><button class='btn btn-"+claseEstado+"'  onclick='mostrarVentanaPedidoCocina("+ filasArreglo[i]["idPedido"] +")'>"+ claseEstado+"</button></td></tr>";
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

		fila += '<tr><td>'+filasArreglo[i]["nombre"]+'</td><td>'+filasArreglo[i]["cantidad"]+'</td><td  ><div class="btn-group"><button id="btnTd'+filasArreglo[i]["numero"]+'" type="button" class="btn btn-'+claseEstado+'">'+claseEstado+'</button><button type="button" class="btn btn-'+claseEstado+'" id="flecha'+filasArreglo[i]["numero"]+'" dropdown-toggle dropdown-toggle-split " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-triangle-bottom"></span></button><div class="dropdown-menu"><button class="dropdown-item btn-block btn-EnEspera" onclick="cambiarEstadoProducto(2,'+filasArreglo[i]["numero"]+')" >En espera</button><button class="dropdown-item btn-block btn-Preparando" onclick="cambiarEstadoProducto(3,'+filasArreglo[i]["numero"]+')" >Preparando</button><button class="dropdown-item btn-block btn-Preparado" onclick="cambiarEstadoProducto(4,'+filasArreglo[i]["numero"]+')">Preparado</button><button class="dropdown-item btn-block btn-Entregado" onclick="cambiarEstadoProducto(5,'+filasArreglo[i]["numero"]+')">Entregado</button> </div></div></td> ';		
		
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

function mostrarVentanaCaja1(){
	var txt= forPantallaCaja1('CAJA', 'Pepito');
	$('#contenedor').html(txt);
	$('#contenedor').append(cargarModalCaja());//Agrega HTML del formulario modal
	nav = 2;	//no. de ventana de modulo mesero
}

function mostrarVentanaMesero1(){
	var txt= forPantallaMesero1('', 'Pepito');
	$('#contenedor').html(txt);
	$('#contenedor').append(cargarPieMesero());//Agrega HTML con boton en piepagina	
	nav = 3;	//no. de ventana de modulo mesero
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
	$(".modal-title").html('Datos del Pedido No. '+ idPedido);
	$(".modal-body").html(cargarDatosPedidoCaja(idPedido));
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
function regresar(){
	switch (nav){
		case 1: 	//Modulo Cocina
			break;

		case 2: 	//Modulo Caja
			break;

		case 3: 	//Modulo Mesero Pantalla inicial, 
			break;

		case 31: 	//Modulo Ventana Hacer nuevo pedido
		case 32: 	//Modulo Ventana Ver un pedido
			mostrarVentanaMesero1();
			break;

		default:
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
function cambiarEstadoProducto(idEstado, idNumProducto){
	removerClases(idNumProducto);
	switch(idEstado){
		case 2://En Espera
			asignarClases("EnEspera",idEstado,idNumProducto);
			break;
		case 3://Preparando
			asignarClases("Preparando",idEstado,idNumProducto);
			break; 
		case 4://Preparado
			asignarClases("Preparado",idEstado,idNumProducto);
			break;
		case 5://Entregado
			asignarClases("Entregado",idEstado,idNumProducto);
			break;
	}
}

/* Asigna las clases al dropdown de tabla detalla pedido de la interfaz del Jefe de cocina*/
function asignarClases(clase,idEstado,idNumProducto){
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

/*Actualiza el estado minimo el pedido*/

function cargarEstadoPedido(idPedido){
}

