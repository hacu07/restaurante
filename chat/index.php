<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="css/estilos.css">
</head>
<body>	
	<!-- Colores aleatorios para identificar a cada usuario en el Chat -->
	<?php 
	$colours = array('007AFF','FF7000','FF7000','15E25F','CFC700','CFC700','CF1100','CF00BE','F00');
	$user_colour = array_rand($colours);
	?>
	<script src="js/jquery-3.1.1.js"></script>
	<script src="js/chat.js"></script>
	<div class="chat_wrapper">
		<div class="message_box" id="message_box"></div>
		<div class="panel">
			<input type="text" name="name" id="name" placeholder="Your Name" maxlength="15" />

			<input type="text" name="message" id="message" placeholder="Message" maxlength="80" 
			onkeydown = "if (event.keyCode == 13)document.getElementById('send-btn').click()"  />
		</div>
		<button id="send-btn" class=button>Send</button>
	</div>
</body>
</html>