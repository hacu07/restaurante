

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
	var txt='<div id="cont_norte"> <div id="imagenLogo" class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1"> <div id="imagen"> 	<img src="img/logo1.png" alt="logo" id="imgLogin"></div></div><div id="infoLogo" class="col-xs-7 col-sm-7 col-md-7 col-lg-7 "> 	<div id="logoModulo" class="col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1 col-xs-4 col-sm-4 col-md-4 col-lg-4"></div><div id="logoNombre" class="col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1 col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>	</div></div><div id="cont_centro"><div class="tbl_cocina"><table class="table table-bordered"> <thead><tr><th scope="col"># Pedido</th><th scope="col">Mesero</th>	<th scope="col">Mesa</th><th scope="col">Estado</th><th scope="col">Ver</th> </tr></thead><tbody>';
		//Crea filas
		txt += '<tr><th scope="row">1</th><td>Harold</td><td>Harold</td><td>Harold</td><td><button>Ver Detalles</button></td></tr>';
		txt += '</tbody></table></div></div>';
	$('#contenedor').html(txt);
}