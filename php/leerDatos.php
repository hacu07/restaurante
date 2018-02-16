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
		$sql = "SELECT pedidos.idPedido, usuario.nombre, mesa.numMesa, pedidos.fechaPedido , estadopedido.estado
					from mesa inner join pedidos on pedidos.numMesa = mesa.numMesa 
    						INNER join estadopedido on pedidos.idEstado = estadopedido.idEstado
		  					inner join usuario on pedidos.idMesero = usuario.idUsuario ";
		leerRegistro($sql);
		break;

	case 3: 
		$idPedido = $_POST["idPedido"];
		$sql = "SELECT producto.nombre, productopedido.cantidad, estadopedido.estado 
					FROM producto INNER JOIN productopedido on producto.idProducto = productopedido.idProducto
		     					  INNER JOIN estadopedido on productopedido.idEstado = estadopedido.idEstado WHERE productopedido.idpedido =".$idPedido;
		leerRegistro($sql);
		break;
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


?>