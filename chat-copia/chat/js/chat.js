$(document).ready(function(){
	//crea un nuevo objeto WebSocket.
	var wsUri = "ws://192.168.1.84:9000/chat/chat/server.php"; //direccion del servidor 	
	websocket = new WebSocket(wsUri); 	
	
	websocket.onopen = function(ev) { // Conexion Abierta 
		$('#caja_mensaje').append("<div class=\"mensaje_sistema\">Conectado!</div>"); //Notificacion al usuario
	}

	$('#btnEnviar').click(function(){ //use clicks message send button	
		var miMensaje = $('#mensaje').val(); //get message text
		var miNombre = $('#nombre').val(); //get user name
		
		if(miNombre == ""){ //empty name?
			alert("Ingrese su nombre por favor!");
			return;
		}
		if(miMensaje == ""){ //emtpy message?
			alert("Ingrese algun mensaje por favor!");
			return;
		}
		document.getElementById("nombre").style.visibility = "hidden";
		
		var objDiv = document.getElementById("caja_mensaje");
		objDiv.scrollTop = objDiv.scrollHeight;
		//prepare json data
		var msg = {
		message: miMensaje,
		name: miNombre,
		color : '<?php echo $colours[$user_colour]; ?>'
		};
		//convert and send data to server
		websocket.send(JSON.stringify(msg));
	});
	
	//#### Message received from server?
	websocket.onmessage = function(ev) {
		var msg = JSON.parse(ev.data); //PHP sends Json data
		var type = msg.type; //message type
		var umsg = msg.message; //message text
		var uname = msg.name; //user name
		var ucolor = msg.color; //color

		if(type == 'usermsg') 
		{
			$('#caja_mensaje').append("<div><span class=\"nombre_usuario\" style=\"color:#"+ucolor+"\">"+uname+"</span> : <span class=\"mensaje_usuario\">"+umsg+"</span></div>");
		}
		if(type == 'system')
		{
			$('#caja_mensaje').append("<div class=\"mensaje_sistema\">"+umsg+"</div>");
		}
		
		$('#message').val(''); //reset text
		
		var objDiv = document.getElementById("caja_mensaje");
		objDiv.scrollTop = objDiv.scrollHeight;
	};
	
	websocket.onerror	= function(ev){$('#caja_mensaje').append("<div class=\"system_error\">Ocurrio un error - "+ev.data+"</div>");}; 
	websocket.onclose 	= function(ev){$('#caja_mensaje').append("<div class=\"mensaje_sistema\">Conexion cerrada</div>");}; 
});