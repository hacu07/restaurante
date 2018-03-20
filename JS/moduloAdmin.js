//************************************************//
//			MODULO ADMINISTRADOR 	
/*************************************************/

function mostrarModuloAdmin(nombre){

	var txt = forEncabezado("ADMINISTRADOR",nombre);

	txt += '<div id="cont_centro">';


	txt += '<div id="menu" class="col-md-2 col-lg-2 col-sm-2">';
	txt += '<button type=button id="btnUsuario" class="btn btn-block " onclick=registroNuevosUsuarios()>USUARIO</button>';
	txt += '<button type=button id="btnCategorias" class="btn btn-block ">CATEGORIAS</button>';
	txt += '<button type=button id="btnProductos" class="btn btn-block ">PRODUCTOS</button>';
	txt += '<button type=button id="btnEstadisticas" class="btn btn-block ">ESTADISTICAS</button>';
	txt += '</div>';

	txt += '<div id="trabajo" class="col-md-10 col-lg-10 col-sm-10" >';
	txt += '<div id="titulo"></div>';
	txt += '<div id="trabajoCentro">';
	txt += '</div>';
	txt += '<div id="tabajoSur"></div>';
	txt += '</div>';

	txt += '</div>';


	$("#contenedor").html(txt);
}


function registroNuevosUsuarios(){

	var txt = '<h1>REGISTRAR USUARIO </h1>';

    $("#titulo").html(txt); 


    var txt1 = '<form>';
    txt1 += '<label for="choose">¿Preferirías un plátano o una cereza?</label>';
    txt1 += ' <input id="choose" name="i_like" pattern="plátano|cereza">';
    txt1 += '<button>Enviar</button>';
    txt1 += '</form>';
    txt1 += '';
    txt1 += '';
    txt1 += '';
    txt1 += '';
    txt1 += '';
    txt1 += '';

    $("#trabajoCentro").html(txt1); 

}