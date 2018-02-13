/********************************************************************
* RESTAURANTE.JS: Modulo Controlador del aplicativo RESTAURANTES.
* Marco Leon Mora, Feb/2018
* ajustes:
* ver.: 1.00
********************************************************************/
var nav = 1;				//Controla la navegacion entre pantallas. 1: Inicial


//****** Llamado desde INDEX, controla modulo a accesar *********************
function iniciarSesion(){
	var opcion = $('#usuario').val();
	switch (opcion) {
		case "1":
			mostrarVentanaChef1();	//ventana 1 chef
			break;
		case "2":
			mostrarVentanaCaja1(); //ventana 2 Cajero
			break;
		case "3":
			mostrarVentanaMesero1(); //ventana 3 Mesero
			break;
	}	
}

//****** MOSTRAR VENTANAS **************************************************
function mostrarVentanaChef1(){
	var txt= forPantallaChef1('COCINA', 'Paula Andrea Sanchez Torres');
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
function imprimirFactura(){

}
