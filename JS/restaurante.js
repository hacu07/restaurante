/********************************************************************
* RESTAURANTE.JS: Modulo Controlador del aplicativo RESTAURANTES.
* Marco Leon Mora, Feb/2018
* ajustes:
* ver.: 1.00
********************************************************************/
var nav = 1;				//Controla la navegacion entre pantallas. 1: Inicial
var usuario = {};		//Contiene la respuesta de la tabla usuario
var pedidos = {}; 		//consulta para mostrar en jefeCocina 
var filaHtml ; //	Llena las filas 


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
	    	mostrarAlerta(' No se pudo realizar la conexión al servidor. ' + status)
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

		}

}

/******************** ACCIONES DE Consulta  ***************************************************/
function consultarPedidosCocina(){
	var parametros = { "opc" : 2};
	ejecutarAjaxJson(parametros,2);
}


function tablaCocina(filasArreglo){
	//Llenado de filas html
	var fila = "<table class='table table-hover table-striped'>";
	fila +='<thead><tr><th>#</th><th>Mesero</th><th>Mesa</th><th>Demora</th><th>Estado</th></tr></thead>';
	fila += "<tbody>";
	for (var i = 0; i < filasArreglo.length; i++) {
		fila +="<tr><td>"+ filasArreglo[i]["idPedido"] +"</td><td>"+ filasArreglo[i]["nombre"] +"</td><td>"+ filasArreglo[i]["numMesa"] +"</td><td>"+ filasArreglo[i]["fechaPedido"] +"</td><td>Estado</td></tr>";
	}
		fila +='</tbody></table>';
		$('#cont_centro').html(fila);
	//	return filaHtml;
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
	$(".modal-body").html(cargarDatosPedidoCocina(idPedido));
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