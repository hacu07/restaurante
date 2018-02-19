/* Contiene los formatos de pantalla*/

/*Presenta tabla de pedidos para preparacion y despacho por el Chef*/
function forPantallaChef1(modulo, empleado){

	var txt =forEncabezado(modulo, empleado);
	txt +='<div id="cont_centro"></div>';
	//Desps de cargar este DIV se hace la consulta para el llenado de la tabla en consultarPedidosCocina();
	return txt;
}

/*Presenta tabla de pedidos para control, facturacion y pagos por el cajero*/
function forPantallaCaja1(modulo, empleado){
	var txt =forEncabezado(modulo, empleado);
	txt +='<div id="cont_centro"><table class="table table-hover table-striped">';
	txt +='<thead><tr><th>#</th><th>Mesero</th><th>Mesa</th><th>Demora</th><th>Ver</th></tr></thead>';
	txt +='<tbody><tr><td>1</td><td>Juan</td><td>15</td><td>0h:05m:30s</td>';
	txt +='<td><button type="button" class="btn btn-danger btn-tabla"  onclick="mostrarVentanaPedidoCaja(1)">En Espera</button></td></tr>';
	txt +='<tr><td>2</td><td>Juan</td><td>15</td><td>0h:05m:30s</td>';
	txt +='<td><button type="button" class="btn btn-warning btn-tabla" onclick="mostrarVentanaPedidoCaja(2)">En preparacion</button></td></tr>';
	txt +='<tr><td>3</td><td>Juan</td><td>15</td><td>0h:05m:30s</td>';
	txt +='<td><button type="button" class="btn btn-warning btn-tabla" onclick="mostrarVentanaPedidoCaja(3)">En preparacion</button></td></tr>';
	txt +='<tr><td>4</td><td>Juan</td><td>15</td><td>0h:05m:30s</td>';
	txt +='<td><button type="button" class="btn btn-warning btn-tabla" onclick="mostrarVentanaPedidoCaja(4)">En preparacion</button></td></tr>';
	txt +='<tr><td>5</td><td>Juan</td><td>15</td><td>0h:05m:30s</td>';
	txt +='<td><button type="button" class="btn btn-info btn-tabla" onclick="mostrarVentanaPedidoCaja(5)">Preparado</button></td></tr>';
	txt +='</tbody></table></div>';
	return txt;
}

/*Presenta tabla para toma de pedidos por el mesero*/
function forPantallaMesero1(modulo, empleado){
	var txt =forEncabezado(modulo, empleado);
	txt +='<div id="cont_centro"><h4 class="tituloTabla">SUS PEDIDOS</h4><table class="table table-hover table-striped">';
	txt +='<thead><tr><th>#</th><th>Mesa</th><th>Demora</th><th>Estado</th></tr></thead>';
	txt +='<tbody><tr><td>1</td><td>15</td><td>0h:05m:30s</td>';
	txt +='<td><button type="button" class="btn btn-danger btn-tabla"  onclick="mostrarPedidoMesero(1)">En Espera</button></td></tr>';
	txt +='<tr><td>2</td><td>10</td><td>0h:05m:30s</td>';
	txt +='<td><button type="button" class="btn btn-warning btn-tabla" onclick="mostrarPedidoMesero(2)">En preparacion</button></td></tr>';
	txt +='<tr><td>3</td><td>5</td><td>0h:05m:30s</td>';
	txt +='<td><button type="button" class="btn btn-warning btn-tabla" onclick="mostrarPedidoMesero(3)">En preparacion</button></td></tr>';
	txt +='<tr><td>4</td><td>8</td><td>0h:05m:30s</td>';
	txt +='<td><button type="button" class="btn btn-warning btn-tabla" onclick="mostrarPedidoMesero(4)">En preparacion</button></td></tr>';
	txt +='<tr><td>5</td><td>20</td><td>0h:05m:30s</td>';
	txt +='<td><button type="button" class="btn btn-info btn-tabla" onclick="mostrarPedidoMesero(5)">Preparado</button></td></tr>';
	txt +='</tbody></table>';

	return txt;
}

/*Presenta tabla para asignar mesa a nuevo pedido, por el mesero*/
function forPantallaAsignarMesa(){
	var txt = '<h4 class="tituloTabla">ASIGNAR MESA</h4><table class="table table-hover table-striped">';
	txt +='<thead><tr><th>Mesa</th><th>Sillas</th><th>Estado</th></tr></thead>';

	txt +='<tbody><tr><td>1</td><td>2</td>';
	txt +='<td><button type="button" class="btn btn-info btn-tabla" onclick="asignarMesa(1)">Disponible</button></td></tr>';

	txt +='<tr><td>2</td><td>4</td>';
	txt +='<td><button type="button" class="btn btn-warning btn-tabla" onclick="asignarMesa(1)">Ocupado</button></td></tr>';

	txt +='<tr><td>3</td><td>8</td>';
	txt +='<td><button type="button" class="btn btn-primary btn-tabla" onclick="asignarMesa(1)">Reservado</button></td></tr>';

	txt +='<tr><td>4</td><td>2</td>';
	txt +='<td><button type="button" class="btn btn-info btn-tabla" onclick="asignarMesa(1)">Disponible</button></td></tr>';

	txt +='<tr><td>5</td><td>2</td>';
	txt +='<td><button type="button" class="btn btn-info btn-tabla" onclick="asignarMesa(1)">Disponible</button></td></tr>';


	txt +='<tr><td>6</td><td>4</td>';
	txt +='<td><button type="button" class="btn btn-danger btn-tabla" onclick="asignarMesa(1)">Fuera de servicio</button></td></tr>';

	txt +='<tr><td>7</td><td>4</td>';
	txt +='<td><button type="button" class="btn btn-warning btn-tabla" onclick="asignarMesa(1)">Ocupado</button></td></tr>';

	txt +='<tr><td>8</td><td>8</td>';
	txt +='<td><button type="button" class="btn btn-primary btn-tabla" onclick="asignarMesa(1)">Reservado</button></td></tr>';

	txt +='</tbody></table>';
	return txt;
}
//<input type="radio" id="radio-1" name="radios" value="A" />

//Presenta el encabezado de las pantallas***********************************************
function forEncabezado(modulo, empleado){
	var txt ='<div id="cont_norte"><div id="imagenLogo" class="col-xs-3">';
	txt +='<img src="img/logo1.png" alt="logo" id="imgLoginChef"></div>';
	if (modulo != ''){
		txt +='<div class="col-xs-7 "><div id="logoModulo" class="col-xs-12 col-md-6"><h1>'+ modulo +'</h1></div>';
		txt +='<div id="logoNombre" class="col-xs-12 col-md-6"><h1>'+ empleado +'</h1></div></div>';
		txt += '<div class="col-xs-2" id="divBotonSalir"><a type="button" class="btn btn-info" id="btnSalir" href = "index.html"><span class="glyphicon glyphicon-off"></span></a></div></div>';
	}else{	//Caso mesero, el encabezado es diferente
		txt +='<div id="logoNombre" class="col-xs-7"><h1>'+ empleado +'</h1></div>';
		txt += '<div class="col-xs-2" id="divBotonSalir"><a type="button" class="btn btn-info" id="btnSalir" href = "index.html"><span class="glyphicon glyphicon-off"></span></a></div></div>';
	}
	return txt;
}

//**** HTML de la ventana modal cocina para agregar al contenedor ***********************
function cargarModalCocina(){
	var txt='<!-- Modal --><div class="modal fade" id="myModal" role="dialog">';
	txt += '<div class="modal-dialog">';
	txt += '<!-- Modal content--><div class="modal-content">';
	txt += '<div class="modal-header"><button type="button" class="close" onclick="cerrarModal()">&times;</button>';
	txt += '<h4 class="modal-title"></h4></div>';
	txt += '<div class="modal-body"></div><div class="modal-footer">';
	txt += '<button type="button" class="btn btn-success" onclick="cerrarModal()">Confirmar Cambios</button>';
	txt += '</div></div></div></div>';
	return txt;
}

//OJO: estos dos metodos son similares
//**** HTML de la ventana modal caja para agregar al contenedor ***********************
function cargarModalCaja(){
	var txt='<!-- Modal --><div class="modal fade" id="myModal" role="dialog">';
	txt += '<div class="modal-dialog">';
	txt += '<!-- Modal content--><div class="modal-content">';
	txt += '<div class="modal-header"><button type="button" class="close" onclick="cerrarModal()">&times;</button>';
	txt += '<h4 class="modal-title"></h4></div>';
	txt += '<div class="modal-body"></div><div class="modal-footer">';
	txt += '<button type="button" class="btn btn-warning" onclick="imprimirFactura()">Imprimir</button>';
	txt += '<button type="button" class="btn btn-success" onclick="cerrarModal()">Pagar</button>';
	txt += '</div></div></div></div>';
	return txt;
}

//OJO: estos dos metodos son similares
//**** HTML de la ventana modal caja para agregar al contenedor ***********************
function tablaPedidoMesero(idPedido){	// cargarModalMesero(){
	var txt = '<h4 class="tituloTabla">PEDIDO No. '+ idPedido +'</h4>';
	txt += '<table class="table table-hover table-striped">';
	txt +='<thead><tr><th>Producto</th><th>Cant.</th><th>Estado</th><th>Precio</th><th>Total</th></thead><tbody>';

	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';

	txt +='<tr align="right"><td colspan = 3>Subtotal</td><td colspan = 2>$450.000</td></tr>';
	txt +='<tr align="right"><td colspan = 3>IVA</td><td colspan = 2>$72.000</td></tr>';
	txt +='<tr align="right"><td colspan = 3>A PAGAR</td><td colspan = 2>$522.000</td></tr>';
	txt +='</tbody></table>';
	return txt;
}

function cargarPieMesero(){
	var txt ='<div id="cont_pie">';
	txt += '<button type="button" class="btn btn-success pull-left" onclick="regresar()">Regresar</button>';
	txt += '<button type="button" class="btn btn-success pull-right" onclick="mostrarVentanaNuevoPedido()">Nuevo</button></div>';
	return txt;
}

//**** HTML con datos de un Pedido a cargar en ventana modal, PROVISIONAL??? ***********************
function cargarDatosPedidoCocina(idPedido){
	var txt = '<h5>Pedido '+ idPedido +'</h5>';
	var txt = '<table class="table table-hover table-striped">';
	txt +='<thead><tr><th>Producto</th><th>Cant.</th><th>Estado</th><th>Preparar</th><th>Entregado</th></thead>';

/*	txt +='<tbody><tr><td>Churrasco Argentino</td><td>3</td><td>En espera</td>';
	txt +='<td><button type="button" class="btn btn-danger btn-tabla" onclick="cambiarEstadoPedido()"> Asignar</button></td>';
	txt +='<td><input type="checkbox" id="checkbox110" class="filled-in" disabled></td></tr>';
	txt +='</tbody></table>';*/
	return txt;		
}

//**** HTML con datos de un Pedido a cargar en ventana modal, PROVISIONAL??? ***********************
function cargarDatosPedidoCaja(idPedido){
	var txt = '<h5>Pedido '+ idPedido +'</h5>';
	var txt = '<table class="table table-hover table-striped">';
	txt +='<thead><tr><th>Producto</th><th>Cant.</th><th>Estado</th><th>Precio</th><th>Total</th></thead><tbody>';

	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';
	txt +='<tr><td>Churrasco Argentino</td><td>3</td><td>Entregado</td><td>$15.000</td><td>$45.000</td></tr>';

	txt +='<tr align="right"><td colspan = 3>Subtotal</td><td colspan = 2>$450.000</td></tr>';
	txt +='<tr align="right"><td colspan = 3>IVA</td><td colspan = 2>$72.000</td></tr>';
	txt +='<tr align="right"><td colspan = 3>A PAGAR</td><td colspan = 2>$522.000</td></tr>';

	txt +='</tbody></table>';
	return txt;		
}
