/* CONTROLADOR */

function iniciarSesion(){
	var opcion = $('#usuario').val();
	switch (opcion) {
		case "1":
			mostrarVentanaChef1();	//ventana 1 chef
			break;
		case "2":
			alert('Cajero'); //ventana 1 Cajero
			break;
		case "3":
			alert('Mesero'); //ventana 1 Cajero
			break;
	}	
}

function mostrarPedido(idPedido){
	forEmergente();
}
//****** MOSTRAR VENTANAS **************
function mostrarVentanaChef1(){
	var txt= forPantallaChef1('COCINA', 'Paula Sanchez Arias');
	$('#contenedor').html(txt);
	$('#contenedor').append(cargarModal());
}


function mostrarVentanaPedido(idPedido){
	alert("Pedido No. "+idPedido);
}



//***************************
