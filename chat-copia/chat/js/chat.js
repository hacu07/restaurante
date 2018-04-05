$(document).ready(function(){
	//crea un nuevo objeto WebSocket.
	var wsUri = "ws://192.168.1.84:9000/restaurante/chat-copia/chat/php/server.php"; //direccion del servidor 	
	websocket = new WebSocket(wsUri); 	
	
	websocket.onopen = function(ev) { // Conexion Abierta 
		$('#caja_mensaje').append("<div class=\"mensaje_sistema\">Conectado!</div>"); //Notificacion al usuario
	}

	$('#btnEnviar').click(function(){ //Funcion cuando presiona clic en boton enviar	
		var miMensaje = $('#mensaje').val(); //obtiene el mensaje
		var miNombre = $('#nombre').val(); //obtiene el nombre
		
		if(miNombre == ""){ //Si el campo de nombre esta vacio
			alert("Ingrese su nombre por favor!");
			return;
		}
		if(miMensaje == ""){ //Si el campo de mensaje esta vacio
			alert("Ingrese algun mensaje por favor!");
			return;
		}
		document.getElementById("nombre").style.visibility = "hidden";
		
		var objDiv = document.getElementById("caja_mensaje");
		objDiv.scrollTop = objDiv.scrollHeight;
		//Prepara los datos de JSON
		var msg = {
		message: miMensaje,
		name: miNombre,
		color : '<?php echo $colours[$user_colour]; ?>'
		};
		//Convierte y envia los datos al servidor
		websocket.send(JSON.stringify(msg));
	});
	
	//#### Mensaje recibido del servidor?
	websocket.onmessage = function(ev) {
		var msg = JSON.parse(ev.data); //PHP envia los datos JSON
		var type = msg.type; //Tipo de mensaje
		var umsg = msg.message; //Texto del mensaje
		var uname = msg.name; //Nombre Usuario
		var ucolor = msg.color; //Color Asignado al Usuario

		if(type == 'usermsg') 
		{
			$('#caja_mensaje').append("<div><span class=\"nombre_usuario\" style=\"color:#"+ucolor+"\">"+uname+"</span> : <span class=\"mensaje_usuario\">"+umsg+"</span></div>");
		}
		if(type == 'system')
		{
			$('#caja_mensaje').append("<div class=\"mensaje_sistema\">"+umsg+"</div>");
		}
		
		$('#message').val(''); //Reseteo del texto
		
		var objDiv = document.getElementById("caja_mensaje");
		objDiv.scrollTop = objDiv.scrollHeight;
	};
	
	websocket.onerror	= function(ev){$('#caja_mensaje').append("<div class=\"system_error\">Ocurrio un error - "+ev.data+"</div>");}; 
	websocket.onclose 	= function(ev){$('#caja_mensaje').append("<div class=\"mensaje_sistema\">Conexion cerrada</div>");}; 
});