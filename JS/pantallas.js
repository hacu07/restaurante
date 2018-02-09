/* Contiene los formatos de pantalla*/

/*Presenta tabla de pedidos para preparacion y despacho por el Chef*/
function forPantallaChef1(modulo, empleado){
	var txt =forEncabezado(modulo, empleado);

	txt +='<div id="cont_centro"><table class="table table-hover table-striped">';
	txt +='<thead><tr><th>Pedido</th><th>Mesero</th><th>Mesa</th><th>Estado</th><th>Ver</th></tr></thead>';
	txt +='<tbody><tr><td>1</td><td>Juan</td><td>15</td><td>En preparacion</td>';
	txt +='<td><button type="button" class="btn btn-info btn-tabla" data-toggle="modal" data-target="#myModal">Ver</button></td></tr>';



	txt +='<tr><td>2</td><td>Juan</td><td>15</td><td>En preparacion</td>';
	txt +='<td><button type="button" class="btn btn-info btn-tabla" data-toggle="modal" data-target="#myModal">Ver</button></td></tr>';
	txt +='<tr><td>3</td><td>Juan</td><td>15</td><td>En preparacion</td>';
	txt +='<td><button type="button" class="btn btn-info btn-tabla" data-toggle="modal" data-target="#myModal">Ver</button></td></tr>';
	txt +='<tr><td>4</td><td>Juan</td><td>15</td><td>En preparacion</td>';
	txt +='<td><button type="button" class="btn btn-info btn-tabla" data-toggle="modal" data-target="#myModal">Ver</button></td></tr>';
	txt +='<tr><td>5</td><td>Juan</td><td>15</td><td>En preparacion</td>';
	txt +='<td><button type="button" class="btn btn-info btn-tabla" data-toggle="modal" data-target="#myModal">Ver</button></td></tr>';
	txt +='</tbody></table></div>';
	return txt;
}


/*Presenta el encabezado de las pantallas*/
function forEncabezado(modulo, empleado){
	var txt ='<div id="cont_norte"><div id="imagenLogo" class="col-xs-3 col-xs-offset-1 ">';
	txt +='<img src="img/logo1.png" alt="logo" id="imgLoginChef"></div>';
	txt +='<div id="logoModulo" class="col-xs-5"><h1>'+ modulo +'</h1></div>';
	txt +='<div id="logoNombre" class="col-xs-3"><h1>'+ empleado +'</h1></div></div>';
	return txt;
}

function forEmergente(){

}

function cargarModal(){
	var txt='<!-- Modal --><div class="modal fade" id="myModal" role="dialog">';
	txt += '<div class="modal-dialog">';
	txt += '<!-- Modal content--><div class="modal-content">';
	txt += '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button>';
	txt += '<h4 class="modal-title">Modal Header</h4></div>';
	txt += '<div class="modal-body"><p>Some text in the modal.</p></div>';
	txt += '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
	txt += '</div></div></div></div>';
	return txt;
}

