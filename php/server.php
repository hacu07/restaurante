<?php
$host = 'localhost'; //host
$port = '9000'; //port
$null = NULL; //null var

//Crea el socket y el recurso que retorna lo almacena en una variable
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);//dominio,tipo,protocolo
//Establece las opciones para el socket
socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);//recurso socket valido,nivel de protocolo de la opcion, opcion del socket, valor opcional.

//Vincula un nombre al socket
socket_bind($socket, 0, $port);//recurso socket valido, direccion, puerto (Solo cuando el dominio del socket = AF_INET)

//Escucha conexiones entrantes sobre el socket creado 
socket_listen($socket);

//Crea y agrega el socket a la lista
$clients = array($socket);

//Inicia un ciclo sin fin para que nuestro script nunca se detenga
while (true) {
	//Gestiona multiples conexiones
	$changed = $clients;
	//Devuelve los recursos sockets en arreglo $changed
	socket_select($changed, $null, $null, 0, 10);//read, write, except, tv_sec (timeout para respuesta, cuando es 0 responde inmediato) , tv_usec
	
	//Comprueba que el socket exista en el array
	//in_array(valorABuscar,Array)
	if (in_array($socket, $changed)) {
		$socket_new = socket_accept($socket); //Acepta la conexion del socket, devuelve un recurso Socket si es true.
		$clients[] = $socket_new; //agrega el socket al arreglo Clientes
		
		$header = socket_read($socket_new, 1024); //lee los datos enviados por el socket (informacion como cadena)
		perform_handshaking($header, $socket_new, $host, $port); //Solicitud de WebSocket para conexion con el servidor
		
		socket_getpeername($socket_new, $ip); //Obtiene la direccion IP del socket conectado
		$response = mask(json_encode(array('type'=>'system', 'message'=>$ip.' connected'))); //Prepara el JSON
		send_message($response); //Notifica a todos los usuarios de la nueva conexion
		
		//Hace un espacio para el nuevo Socket
		$found_socket = array_search($socket, $changed);//(ObjetoABuscar,DondeBuscarlo)
		unset($changed[$found_socket]);//Destruye el socket de la lista 
	}
	
	//Bucle a traves de todos los sockets conectados
	foreach ($changed as $changed_socket) {	
		
		//Verifica cualquier dato entrante
		while(socket_recv($changed_socket, $buf, 1024, 0) >= 1)//Recibe informacion de un socket conectado(socket,buf,len,flags)
		{
			$received_text = unmask($buf); //unmask data
			$tst_msg = json_decode($received_text); //json decode 
			$user_name = $tst_msg->name; //sender name
			$user_message = $tst_msg->message; //message text
			$user_color = $tst_msg->color; //color
			
			//prepare data to be sent to client
			$response_text = mask(json_encode(array('type'=>'usermsg', 'name'=>$user_name, 'message'=>$user_message, 'color'=>$user_color)));
			send_message($response_text); //Envia los datos
			break 2; //exist this loop
		}
		
		$buf = @socket_read($changed_socket, 1024, PHP_NORMAL_READ);
		if ($buf === false) { // check disconnected client
			// remove client for $clients array
			$found_socket = array_search($changed_socket, $clients);
			socket_getpeername($changed_socket, $ip);
			unset($clients[$found_socket]);
			
			//notify all users about disconnected connection
			$response = mask(json_encode(array('type'=>'system', 'message'=>$ip.' disconnected')));
			send_message($response);
		}
	}
}
// close the listening socket
socket_close($socket);

function send_message($msg)
{
	global $clients;
	foreach($clients as $changed_socket)
	{
		@socket_write($changed_socket,$msg,strlen($msg));
	}
	return true;
}


//Unmask incoming framed message
function unmask($text) {
	$length = ord($text[1]) & 127;
	if($length == 126) {
		$masks = substr($text, 4, 4);
		$data = substr($text, 8);
	}
	elseif($length == 127) {
		$masks = substr($text, 10, 4);
		$data = substr($text, 14);
	}
	else {
		$masks = substr($text, 2, 4);
		$data = substr($text, 6);
	}
	$text = "";
	for ($i = 0; $i < strlen($data); ++$i) {
		$text .= $data[$i] ^ $masks[$i%4];
	}
	return $text;
}

//Encode message for transfer to client.
function mask($text)
{
	$b1 = 0x80 | (0x1 & 0x0f);
	$length = strlen($text);
	
	if($length <= 125)
		$header = pack('CC', $b1, $length);
	elseif($length > 125 && $length < 65536)
		$header = pack('CCn', $b1, 126, $length);
	elseif($length >= 65536)
		$header = pack('CCNN', $b1, 127, $length);
	return $header.$text;
}

//handshake new client.
function perform_handshaking($receved_header,$client_conn, $host, $port)
{
	$headers = array();
	$lines = preg_split("/\r\n/", $receved_header);//divide la cadena recibida mendiante una expresion regular
	foreach($lines as $line)
	{
		$line = chop($line);//Elimina los espacios del final de la cadena
		if(preg_match('/\A(\S+): (.*)\z/', $line, $matches))//Compara expesiones regulares(patron de busqueda como cadena, cadena, contiene el texto que coincidio con el patron)
		{
			$headers[$matches[1]] = $matches[2];
		}
	}

	$secKey = $headers['Sec-WebSocket-Key'];//obtiene la clave 
	//sha1()calcula es 'hash' sha1 de un string
	//pack(formato) empaqueta informacion en cadena binaria
	$secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
	//hand shaking header
	$upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
	"Upgrade: websocket\r\n" .
	"Connection: Upgrade\r\n" .
	"WebSocket-Origin: $host\r\n" .
	"WebSocket-Location: ws://$host:$port/demo/shout.php\r\n".
	"Sec-WebSocket-Accept:$secAccept\r\n\r\n";
	socket_write($client_conn,$upgrade,strlen($upgrade));
}
