

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

//****** MOSTRAR VENTANAS **************
function mostrarVentanaChef1(){
	var txt='Hola';
	$('#contenedor').text(txt);
}