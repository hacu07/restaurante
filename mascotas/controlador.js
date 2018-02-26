//Al cargar el documento ejecuta ese metodo "consultarCriaderos"
window.onload = consultarCriaderos;

/* Se carga los calores del dropdown insertando directamente de php a html  */
function consultarCriaderos() {
	//enviar parametros para que realize la consulta de los criaderos y desps sean cargados al html
	var parametros = { "opc" : 1 };
	ejecutarAjax(parametros,cargarDropDown);
}

//parametro funcion: recibe el nombre del metodo a ejecutar una vez se obtenga la respuesta de modelos.php
function ejecutarAjax(datos, funcion){
	$.ajax({                                      
		type: 'post',
		url:  'php/modelo.php',                  
		data: datos,                                       
		//dataType: 'json',                     

	    success : function(response) {
			funcion(response);
	    },
	 
	    error : function(xhr, status) {
	    	console.log(' No se pudo realizar la conexión al servidor. ' + status)
	    },	 
	});	
}



/*Carga el dropdown con el nombre de los criaderos*/
function cargarDropDown(respuesta){
	datosCriaderos = JSON.parse(respuesta);
	if (datosCriaderos.length > 0 ) {
		//cargamos el dropdwon en el div "select"
		var txt = '<div class="dropdown show">';
		txt += '<button class="btn  btn-secondary dropdown-toggle"  role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Criaderos</button>' ;
		txt += 	'<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">';
		//Creamos los botones con los nombres de los criaderos en el dropdown
		for (var i = 0; i< datosCriaderos.length; i++) {
				txt +=  '<button class="dropdown-item btn btn-block" >'+ datosCriaderos[i]["nombreCriadero"] +'</button>';	
			}
		txt += '</div></div>';
	$('#select').html(txt);			
	}

}

