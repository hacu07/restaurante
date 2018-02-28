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
	txt +='<div id="cont_centro"></div>';
	txt +='<div id="cont_sur"><button id="btnCargarFacturas" class="btn" onclick="consultarFacturas()">Actualizar Facturas</button></div>';
	/*txt +='<div id="cont_centro"></div>';*/ //Se realiza la ventana "MENSAJE" para una segunda version 
	return txt;
}

/*Presenta tabla para toma de pedidos por el mesero*/
function forPantallaMesero1(modulo, empleado){
	var txt =forEncabezado(modulo, empleado);
	txt +='<div id="cont_centro"></div>';
	txt +='<div id="cont_sur"><button id="btnNuevoPedidoMesero" class="btn btn-block btnSur" onclick="navegar(2)">Nuevo</button></div>';
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
	txt += '</div></div></div></div>';
	return txt;
}

//OJO: estos dos metodos son similares
//**** HTML de la ventana modal caja para agregar al contenedor ***********************
function cargarModalCaja(){
	var txt='<!-- Modal --><div class="modal fade" id="myModal" role="dialog">';
	txt += '<div class="modal-dialog">';
	txt += '<!-- Modal content--><div id="contenidoModal" class="modal-content">';
	txt += '<div class="modal-header"><button type="button" class="close" onclick="cerrarModal()">&times;</button>';
	txt += '<h4 class="modal-title"></h4></div>';
	txt += '<div class="modal-body"></div><div class="modal-footer">';
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
function cargarDatosPedidoCaja(detalleFactura,numPedido,numCajero){
	var txt = '<table class="table table-hover table-striped id="tablaFactura">';
	txt +='<thead><tr><th>Nombre Producto</th><th>Precio</th><th>Cantidad</th><th>Valor</th></thead><tbody>';
	var Subtotal = 0; //SUMA LOS VALORES RECIBIDOS PARA MOSTRAR AL FINAL 


	for (var i = 0; i < detalleFactura.length ; i++) {
		Subtotal = Subtotal + parseInt(detalleFactura[i]["valor"]);
		txt +='<tr><td>'+detalleFactura[i]["nombre"]+'</td><td>'+detalleFactura[i]["Precio"]+'</td><td>'+detalleFactura[i]["cantidad"]+'</td><td>'+detalleFactura[i]["valor"]+'</td></tr>';
	}

	//CALCULOS DE IVA Y VALOR A PAGAR 

	var iva = (Subtotal * 19)/100; //Calcula el iva de la factura
	var valorPagar = Subtotal + iva ; // Calcula el valor total de la factura. 
	//
	/*Subtotal = formatter.format(Subtotal);
	iva = formatter.format(iva);
	valorPagar = formatter.format(valorPagar);*/

	txt +='</tbody></table>';
	txt += '<div>';
	txt += '<h4 class="valoresFactura col-xs-6 col-md-6 col-sm-6 col-lg-6">Subtotal	</h4>';
	txt += '<h4 class="valoresFactura col-xs-6 col-md-6 col-sm-6 col-lg-6">'+Subtotal+'</h4>';
	txt += '<h4 class="valoresFactura col-xs-6 col-md-6 col-sm-6 col-lg-6">IVA</h4>';	
	txt += '<h4 class="valoresFactura col-xs-6 col-md-6 col-sm-6 col-lg-6">'+iva+'</h4>';
	txt += '<h4 class="valoresFactura col-xs-6 col-md-6 col-sm-6 col-lg-6">TOTAL A PAGAR</h4>';
	txt += '<h4 class="valoresFactura col-xs-6 col-md-6 col-sm-6 col-lg-6">'+valorPagar+'</h4>';
	txt += '</div>';
	$(".modal-body").html(txt);

	var txt1 ='<div>';
	var txt1 ='<input type="number" class="col-xs-12 col-md-6 col-lg-6 " id="ccCliente" placeholder="Ingrese la cedula del cliente">';
	txt1 += '<button type="button" class="col-xs-12 col-md-6 col-lg-6 btn btn-success" onclick="generarFacturaPedido('+numPedido+','+numCajero+','+valorPagar+','+iva+')">Generar factura  <span class="glyphicon glyphicon-print"></span></button>';//falta crear evento onclick
	txt1 += '</div>';
	$(".modal-footer").html(txt1);


}


/* Inserta en la BD una nueva factura  */
function generarFacturaPedido(idPedido,idCajero,valorFac,ivaFac){
	var ccCliente = $('#ccCliente').val();
	var parametros = { "opc" : 12, "idPedido" : idPedido, "idCajero" : idCajero, "valorFactura" : valorFac, "ivaFactura" : ivaFac, "ccCliente" : ccCliente };
	ejecutarAjaxJson(parametros,12);
	imprimir("contenidoModal");
	//cambiarEstado a pagado (Porque se ha generado una nueva factura)
	var parametros1 = { "opc" : 13, "idPedido" : idPedido };
	ejecutarAjaxJson(parametros1,13);
	//Vuelve y carga la tabla del cajero 
	consultarFacturas();
}


//Funcion auxiliar para dar formato a valores numericos ***/
var formatter = new Intl.NumberFormat('en-US', {
	style:'currency',
	currency: 'USD',
	miniumFractionDigits: 2,

});

function imprimir(nombreDiv){
	$('.modal-footer').hide();
	var contenido= document.getElementById(nombreDiv).innerHTML;
    var contenidoOriginal= document.body.innerHTML;
    document.body.innerHTML = contenido;
    window.print();
    document.body.innerHTML = contenidoOriginal;
    $('.modal-footer').show();
    cerrarModal();
}