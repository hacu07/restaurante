<?php 

$opcion = $_POST["opc"];


switch ($opcion) {
	case 1:
		$usuario = $_POST["usuario"];
		$password = $_POST["password"];
		$sql = "SELECT * FROM usuario WHERE nombre='{$usuario}'  and contrasenia = '{$password}'";
		leerRegistro($sql);

		break;
	
	case 2:
		$sql = "SELECT DISTINCT Pe.idPedido, U.nombre, Pe.numMesa, Pe.fechaPedido, Pr.idEstado FROM  pedidos Pe
				JOIN usuario U ON Pe.idMesero = U.idUsuario 
				JOIN productoPedido Pr ON Pe.idPedido = Pr.idPedido 
				WHERE Pr.idEstado <= 5 AND 
				Pr.idEstado IN
				( select MIN(idEstado) FROM productopedido Pr WHERE Pr.idPedido = Pe.idPedido )";
		leerRegistro($sql);
		break;

	case 3: 
		$idPedido = $_POST["idPedido"];
		$sql = "SELECT productoPedido.idPedido, producto.nombre, productopedido.cantidad, estadopedido.estado,productopedido.numero 
					FROM producto INNER JOIN productopedido on producto.idProducto = productopedido.idProducto
		     					  INNER JOIN estadopedido on productopedido.idEstado = estadopedido.idEstado WHERE productopedido.idpedido =".$idPedido;
		leerRegistro($sql);
		break;

	case 4: 
		$idEstado = $_POST["idEstado"];
		$numero = $_POST["numero"];
		$sql = "UPDATE productopedido SET idEstado = {$idEstado} WHERE numero ={$numero}";
		actualizarRegistro($sql);
		break;

		case 6:
			$idPedido = $_POST["idPedido"];
			$sql2 = "UPDATE pedidos SET idEstado = (SELECT MIN(idEstado) AS estadoMinimo FROM productopedido WHERE idPedido = {$idPedido}) WHERE idPedido ={$idPedido}";
			actualizarRegistro($sql2);
		break;
		


		//CONSULTAS MODULO DE CAJA (inicia desde 10)


	case 10:  
		// Consulta los pedidos  que esten en estado entregado (5) para cargar tabla Facturas en modulo caja. 
		$sql= "SELECT pedidos.idPedido,pedidos.numMesa,estadopedido.estado FROM pedidos JOIN estadopedido on pedidos.idEstado = estadopedido.idEstado WHERE pedidos.idEstado = 5";

       leerRegistro($sql);         			 
		break;
	case 11:
		$idPedido = $_POST["idPedido"];
		$sql = "SELECT producto.nombre, producto.Precio, productopedido.cantidad, productopedido.valor from producto join productopedido on producto.idProducto = productopedido.idProducto where productopedido.idPedido = {$idPedido}";
		leerRegistro($sql);
	break;
	case 12: 		//Inserta un nuevo registro en la tabla factura y actualiza el estado del pedido a 'Facturado'
		$idPedido= $_POST["idPedido"];
		$idCajero= $_POST["idCajero"];
		$valorFactura= $_POST["valorFactura"];
		$ivaFactura= $_POST["ivaFactura"];
		$ccCliente= $_POST["ccCliente"];
		$sql = "CALL sp_registrarFactura({$idPedido},{$idCajero},{$valorFactura},{$ivaFactura},'{$ccCliente}')";
		//$sql = "INSERT INTO factura(numFactura,fechaFactura,valorFactura,ivaFactura,idCajero,idPedido,ccCliente) VALUES('Aqui va numFactura',NOW(),{$valorFactura},{$ivaFactura},{$idCajero},{$idPedido},'{$ccCliente}')";
		actualizarRegistro($sql);
	break;
	/*case 13:
		$idPedido = $_POST["idPedido"];
		$sql = "UPDATE pedidos SET idEstado = 6 WHERE idPedido = {$idPedido}";
		actualizarRegistro($sql);
	break;*/

	//CONSULTAS MODULO DE MESERO (inicia desde 20)
	case 20: 
		$idMesero = $_POST["idMesero"];
		$sql = "SELECT idPedido, numMesa, estadopedido.estado from pedidos join estadopedido on pedidos.idEstado = estadopedido.idEstado where idMesero = {$idMesero}";
		leerRegistro($sql);
	break;
	case 21:
		$sql = "SELECT numMesa, capacidad FROM mesa WHERE idEstado = 1";
		leerRegistro($sql);
	break;

	case 22: //EJECUTA EL PROCEDIMIENTO ALMACENADO 'vERIFICAR SI YA SE CREO EN LA BD EN CASO DE ERROR'
		$idMesero = $_POST["idMesero"];
		$numMesa = $_POST["numMesa"];
		$sql = "call sp_registrarNuevoPedido({$numMesa},{$idMesero})";
		leerRegistro($sql);
	break;

	case 24:
		$sql= "SELECT * FROM categoria";
		leerRegistro($sql);
	break;


	case 26: //Busca los productos segun la categoria seleccionada
		$idCategoria = $_POST["idCategoria"];
		$sql = "SELECT idProducto, nombre, precio FROM producto WHERE idCategoria = {$idCategoria}";
		leerRegistro($sql);
	break;

	case 27: //Inserta el producto seleccionado a productoPedido
		$idPedido = $_POST["idPedido"];
		$idProducto = $_POST["idProducto"];
		$cantidad = $_POST["cantidad"];
		$valor = $_POST["valor"];
		$sql = "INSERT INTO productopedido(idPedido, idProducto, cantidad, valor, idEstado) values({$idPedido},{$idProducto},{$cantidad},{$valor},2)";
		actualizarRegistro($sql);
	break;

	case 28: //Consulta los productos del pedido para la interfaz del mesero
		$idPedido = $_POST["idPedido"];
		$sql = "SELECT producto.nombre, productopedido.cantidad, estadopedido.estado 
						from productopedido join producto on productopedido.idProducto = producto.idProducto
    					join estadopedido on productopedido.idEstado = estadopedido.idEstado
    					where productopedido.idPedido = {$idPedido}";
		leerRegistro($sql);
}


/****** LEER REGISTRO   ******************************************************
* ejecuta la consulta y devuelve datos en formato JSON
*****************************************************************************/
function leerRegistro($sql){
	include("conexionDB.php");   			//Conecta a la BD $conexion
	$result = $conexion->query($sql);

	$rows = array();
	if ($result != NULL && $result->num_rows > 0) {
    
		while(($r =  mysqli_fetch_assoc($result))) {
		  	$rows[] = $r;	  	
		}
		mysqli_free_result($result);
	}
	mysqli_close($conexion);
	echo json_encode($rows);
}


/*****************************************************************************
INSERTA, ACTUALIZA O ELIMINA REGISTROS DE LA BASE DE DATOS
*****************************************************************************/

function actualizarRegistro($sql){

		include("conexionDB.php");

		if ($conexion->query($sql) === TRUE) {	
			$respuesta = array('ok' => 'actualizo');

		}else  {
	
			$respuesta = array('ok' => 'error' );
		}

		echo json_encode($respuesta);

}


?>