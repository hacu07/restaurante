//************************************************//
//			MODULO ADMINISTRADOR 	
/*************************************************/

//Variables Globales
var idCategoriaGlobal = 0;
var stringGlobal = 0; //almacena el codigo a usar en las estadisticas 

//Metodos Get & Set
function setIdCategoria(id){
    idCategoriaGlobal = id;
}

function getIdCategoria(){
    return idCategoriaGlobal;
}

function setString(string){
    stringGlobal = string;
}

function getString(){
    return stringGlobal;
}




function mostrarModuloAdmin(nombre){

	var txt = forEncabezado("ADMINISTRADOR",nombre);
	txt += '<div id="cont_centroAdmin">';
	txt += '<div id="menu" class="col-md-2 col-lg-2 col-sm-2">';
	txt += '<button type=button id="btnUsuario" class="btn btn-block " onclick=registroNuevosUsuarios()>USUARIO</button>';
	txt += '<button type=button id="btnCategorias" class="btn btn-block" onclick=AgregarCategoria()>CATEGORIAS</button>';
	txt += '<button type=button id="btnProductos" class="btn btn-block "onclick=agregarProducto()>PRODUCTOS</button>';
	txt += '<button type=button id="btnEstadisticas" class="btn btn-block " onclick=consultarVentasGenerales()>ESTADISTICAS</button>';
    txt += '<button type=button id="btnEstadisticas" class="btn btn-block " onclick=consultarPedidosAdmon()>PEDIDOS</button>';
	txt += '</div>';
	txt += '<div id="trabajo" class="col-md-10 col-lg-10 col-sm-10" >';
	txt += '<div id="titulo"></div>';
	txt += '<div id="trabajoCentro">';
	txt += '</div>';
	txt += '<div id="trabajoSur"></div>';
	txt += '</div>';
	txt += '</div>';
	$("#contenedor").html(txt);
    $('#contenedor').append(cargarModalCocina());//Agrega HTML del formulario modal
}


function registroNuevosUsuarios(){
	var txt = '<h1> USUARIOS </h1>';
    $("#titulo").html(txt); 

    var txt1 = '';    
    txt1 += '<img src="img/registroUsuarios.png" alt="Usuario" id="imgUsuario">';
    txt1 += '<div>';
    txt1 += 	'<label for="Nombre">Usuario:</label>';
    txt1 += 	'<input type="text" id="nombre" placeholder="Escriba Nombre de Usuario" minlength="4"/>';
    txt1 += '</div>';
    txt1 += '<div>';
    txt1 += 	'<label for="contrasenia">Contraseña:</label>';
    txt1 += 	'<input type="password" id="contrasenia" placeholder=" Escriba Contraseña" minlength="4" disabled="true"/>';
    txt1 += '</div>';
    txt1 += '<div>';
    txt1 += '<div class="btn-group" >';
    txt1 += '<button id="btnRol" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled="true">ROL<span class="glyphicon glyphicon-triangle-bottom"></span></button>';
    txt1 += '	<div class="dropdown-menu">';
    txt1 += '   <button class="btn btn-block btnDropDown" onclick="cambiarTextoRol(\'ADMINISTRADOR\')">ADMINISTRADOR</button>   ';
    txt1 += '   <button class="btn btn-block btnDropDown" onclick="cambiarTextoRol(\'JEFE DE COCINA\')">JEFE DE COCINA</button>  ';
    txt1 += '   <button class="btn btn-block btnDropDown" onclick="cambiarTextoRol(\'MESERO\')">MESERO</button>  ';
    txt1 += '   <button class="btn btn-block btnDropDown" onclick="cambiarTextoRol(\'CAJERO\')">CAJERO</button>    ';
    txt1 += '</div>';   
    txt1 += '</div>';	
    $("#trabajoCentro").html(txt1); 

    var txt2 = '<div>';
    txt2 += '	<button id="btnRegistrar" class="btn" type="button" onclick="registrarNuevoUsuario()" disabled="true">REGISTRAR</button>';
    txt2 += '   <button id="btnConsultar" class="btn" type="button" onclick="consultarUsuarioAdmon()">CONSULTAR</button>';
    txt2 += '   <button id="btnActualizar" class="btn" type="button" onclick="actualizarUsuarioAdmon()" disabled="true">ACTUALIZAR</button>';
    txt2 += '   <button id="btnEliminar" class="btn" type="button" onclick="eliminarUsuarioAdmon()" disabled="true">ELIMINAR</button>';
    txt2 += ' </div>';
    $("#trabajoSur").html(txt2); 
}

  
function AgregarCategoria(){
	var txt = '<h1>AÑADIR NUEVA CATEGORIA</h1>';
    $("#titulo").html(txt); 

    var txt1 = '';
    txt1 += '<div class="col-sm-4 col-lg-4 col-md-4">';
    txt1 += '  <div id="cargaTablaCategorias"></div>';
    txt1 += '';
    txt1 += '</div>';
    txt1 += '<div class="col-sm-8 col-lg-8 col-md-8">';
    txt1 += 	'<label for="categoria">Nombre de la categoria:</label>';
    txt1 += 	'<input type="text" id="nomCategoria" placeholder=" Escriba el nombre de la categoria"/>';
     txt1 += '</div>';
    $("#trabajoCentro").html(txt1); 

    var txt2 = '<div>';
    txt2 += '	<button id="btnAgregar" class="btn" onclick="agregarCategoriaBD()" type="button">AÑADIR</button>';
    txt2 += '   <button id="btnAgregarProductos" class="btn" type="button" onclick="eliminarCategoriaAdmon()">ELIMINAR</button>';
    txt2 += ' </div>';
    $("#trabajoSur").html(txt2);

    consultarNombresCategorias(); 
 
}
function consultarNombresCategorias(){
    var parametros = {"opc": 48};
    ejecutarAjaxJson(parametros,48);
}

function agregarProducto(){

 var txt2='<div id="tablaProductos" >';

    txt2 +='</div>';
    $("#trabajoCentro").html(txt2);

    var parametros = {"opc" : 46};
    ejecutarAjaxJson(parametros,46);

}


//ELIMINAR CATEGORIAS DE LA BASE DE DATOS 
function eliminarCategoriaAdmon(){
    var categoria = $("#nomCategoria").val(); //obtiene lo escrito en el campo de nombre
    if (categoria == "") {//valida que los campos necesario esten digitados correctamente  
        mostrarModal('Campos Incompletos', 'Debe poner nombre de la categoria', '');
    }else{
        var txt = '<button class="btn btn-success" onclick="eliminarCategoria(\''+categoria+'\')">SI</button><button class="btn btn-danger" onclick="cerrarModal()">NO</button>';
        mostrarModal('Confirmar Eliminacion', '¿Esta seguro de eliminar Categoria?', txt);
    }
}

function eliminarCategoria(){
    var categoria = $('#nomCategoria').val();
    var parametros = {"opc" : 54, "categoria" : categoria };
    ejecutarAjaxJson(parametros, 54);
    cerrarModal();
    $("#categoria").val("");

}







function cargarFormProducto(){
     var txt = '<h1>AÑADIR NUEVO PRODUCTO</h1>';
    $("#titulo").html(txt); 

    var txt1 = '';
    txt1 += '<div>';
    txt1 +=     '<label for="producto">Nombre del producto:</label>';
    txt1 +=     '<input type="text" id="producto" placeholder=" Escriba Nombre del producto" />';
    txt1 += '</div>';
    txt1 += '<div>';
    txt1 +=     '<label for="precio">Precio:</label>';
    txt1 +=     '<input type="number" id="precio" placeholder=" Escriba precio el producto" />';
    txt1 += '</div>';
    txt1 += '<div class="btn-group">';
    txt1 += '<button type="button" class="btn btn-primary dropdown-toggle" id="btnCategoria" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Categoria <span class="glyphicon glyphicon-triangle-bottom"></span></button>';
    txt1 += '   <div class="dropdown-menu" id="dpdCategorias">';
    txt1 += '   </div>';   
    txt1 += '</div>';
    txt1 +='<div>';
    txt1 +=     '<label for="archivo">Insertar Imagen:</label>';
    txt1 +='     <input id="inputInsertarImg" name="archivo" type="file">';
    txt1 +='</div>';
    $("#trabajoCentro").html(txt1); 

    var txt2 = '<div>';
    txt2 += '   <button id="btnAgregarProductos" class="btn" type="button" onclick="agregarProductoBD()">AÑADIR</button>';
    txt2 += '   <button id="btnAgregarProductos" class="btn" type="button" onclick="eliminarProductoAdmon()">ELIMINAR</button>';
   txt2 += ' </div>';
    $("#trabajoSur").html(txt2);

  //Consulta para cargar las categorias encontradas en la BD
    var parametros = {"opc" : 44};
    ejecutarAjaxJson(parametros,44);

}


//ELIMINAR PRODUCTOS DE LA BASE DE DATOS 
function eliminarProductoAdmon(){
    var nombreProducto = $("#producto").val(); //obtiene lo escrito en el campo de nombre
    if (nombreProducto == "") {//valida que los campos necesario esten digitados correctamente  
        mostrarModal('Campos Incompletos', 'Debe poner nombre del producto', '');
    }else{
        var txt = '<button class="btn btn-success" onclick="eliminarProducto(\''+nombreProducto+'\')">SI</button><button class="btn btn-danger" onclick="cerrarModal()">NO</button>';
        mostrarModal('Confirmar Eliminacion', '¿Esta seguro de eliminar producto?', txt);
    }
}

function eliminarProducto(){
    var nombreProducto = $('#producto').val();
    var parametros = {"opc" : 53, "nombreProducto" : nombreProducto };
    ejecutarAjaxJson(parametros, 53);
    cerrarModal();
    $("#producto").val("");

}





//Carga el nombre de las categorias al dropdown del formulario de productos
function cargarCategorias(categorias){
    var txt = '';
    for(var i = 0; i < categorias.length; i++){
        txt += '<button class="btn btn-block" onclick="cambiarTextoCategoria('+ categorias[i]["idCategoria"] +',\''+categorias[i]["nombre"]+'\')">'+ categorias[i]["nombre"] +'</button>';
    }
    $('#dpdCategorias').html(txt);
}

//Obtiene el nombre de la categoria y lo asigna al boton principal del dropdown para ver cual fue el seleccionado
function cambiarTextoCategoria(idCategoria, nombreCategoria){
    $('#btnCategoria').text(nombreCategoria);
    setIdCategoria(idCategoria);
}



//Cambia el nombre del elemento #btnRol al rol seleccionado en el dropdown 
function cambiarTextoRol(rol){
    $("#btnRol").text(rol); 
}
 
//Toma el nombres, contraseña y rol del nuevo usuario para insertar a la BD    
function registrarNuevoUsuario(){
    var nombre = $("#nombre").val(); //obtiene lo escrito en el campo de nombre
    var contrasenia = $("#contrasenia").val(); //obtiene lo escrito en el campo de contrasenia
    var rol = $("#btnRol").text();

    if(nombre == "" || contrasenia  == "" || rol == "ROL"){
        alert("Faltan campos por digitar o seleccionar");
    }else{
        if (rol == "ADMINISTRADOR") {
        idRol = 2;
        }else if (rol == "JEFE DE COCINA") {
            idRol = 3;
        }else if (rol == "CAJERO") {
            idRol = 4;
        }else if (rol == "MESERO"){
            idRol = 5;
        }

        var parametros = {"opc" : 40, "nombre" : nombre, "contrasenia" : contrasenia, "idRol" : idRol };
        ejecutarAjaxJson(parametros, 40);
    }

    
}

//Consulta los usuarios en la BD desde el modulo del Administrador, toma solo el valor escrito en el campo de "USUARIO"
function consultarUsuarioAdmon(){
    usuario = $("#nombre").val(); //toma el valor escrito en el campo "USUARIO"
    if (usuario != "") {
        var parametros = {"opc" : 41, "usuario" : usuario};
        ejecutarAjaxJson(parametros,41);
    }else{
        alert("Debe digitar el usuario para consultar");
    }
}

//Limpia lo escrito en los campos del formulario de usuario
function limpiarUsuarioAdmon(){
    $("#nombre").val("");
    $("#contrasenia").val("");
    $("#btnRol").text("ROL");
    document.getElementById("btnRol").disabled  = true;
    document.getElementById("contrasenia").disabled  = true;
    document.getElementById("btnRegistrar").disabled  = true;
    document.getElementById("btnConsultar").disabled  = false;
    document.getElementById("btnActualizar").disabled  = true;
    document.getElementById("btnEliminar").disabled  = true;
}

//Actualiza la contraseña y/o rol del usuario
function actualizarUsuarioAdmon(){
    

    var nombre = $("#nombre").val(); //obtiene lo escrito en el campo de nombre
    var contrasenia = $("#contrasenia").val(); //obtiene lo escrito en el campo de contrasenia
    var rol = $("#btnRol").text();

    switch(rol){
        case 'ADMINISTRADOR':
            idRol = 2;
        break;
        case 'JEFE DE COCINA':
            idRol = 3;
        break;
        case 'CAJERO':
            idRol = 4;
        break;
        case 'MESERO':
            idRol = 5;
        break;
    }

    if (nombre == "" || contrasenia == "" || idRol < 2 || idRol > 5  ) { //valida que los campos necesario esten digitados correctamente 
        mostrarModal('Campos Incompletos', 'Por favor diligencia todos los campos', '');
    }else{
        var txt = '<button class="btn btn-success" onclick="actualizarDatosUsuario(\''+nombre+'\',\''+contrasenia+'\','+idRol+')">SI</button><button class="btn btn-danger" onclick="cerrarModal()">NO</button>';
        mostrarModal('Confirmar Actualizacion', '¿Esta seguro de actualizar los datos del usuario?', txt);
    }
}

function actualizarDatosUsuario(nom,con,id){
    var parametros = {"opc" : 42, "nombre" : nom, "contrasenia" : con, "idRol" : id };
    ejecutarAjaxJson(parametros,42);
    cerrarModal();
    limpiarUsuarioAdmon();
}

//Elimina el usuario de la BD tomando el nombre
function eliminarUsuarioAdmon(){
    var nombre = $("#nombre").val(); //obtiene lo escrito en el campo de nombre
    if (nombre == "") {//valida que los campos necesario esten digitados correctamente  
        mostrarModal('Campos Incompletos', 'Todos los campos deben estar correctamente diligenciados', '');
    }else{
        var txt = '<button class="btn btn-success" onclick="eliminarUsuario(\''+nombre+'\')">SI</button><button class="btn btn-danger" onclick="cerrarModal()">NO</button>';
        mostrarModal('Confirmar Eliminacion', '¿Esta seguro de eliminar los datos del usuario?', txt);
    }
}


function eliminarUsuario(nombreUsuario){
    var parametros = {"opc" : 43, "nombre" : nombreUsuario};
    ejecutarAjaxJson(parametros, 43);
    cerrarModal();
    $("#nombre").val("");
}



function habilitarBotonesUsuario()
{
    document.getElementById("btnActualizar").disabled  = false;
    document.getElementById("btnEliminar").disabled  = false;
    document.getElementById("btnRol").disabled  = false;
    document.getElementById("contrasenia").disabled  = false;
}


/*Abrir una nueva pestaña*/

function abrirEnPestana(url) {
        var a = document.createElement("a");
        a.target = "_blank";
        a.href = url;
        a.click();
    }

//Falta agregar validaciones ----- OJO OJO OJO OJO 
function agregarProductoBD(){
    var nombreProducto = $('#producto').val(); //Obtiene el nombre del producto
    var precio = $('#precio').val(); //Obtiene el precio del producto
    var idCategoria = getIdCategoria();
    //var imagen = document.getElementById('inputInsertarImg');//Obtiene la imagen seleccionada

    if (nombreProducto =="" || precio=="" || idCategoria==0){
        alert("Faltan campos por llenar");
    }else  {
        var parametros = { "opc" : 45, "nombreProducto" : nombreProducto, "precio" : precio, "idCategoria" : idCategoria, /*"imagen" : imagen*/};
        ejecutarAjaxJson(parametros, 45);
    }
    
}

function agregarCategoriaBD(){
    var nombreCategoria = $('#nomCategoria').val(); //obtiene el nombre de la categoria

    if (nombreCategoria !=""){
        var parametros = { "opc": 47, "nombreCategoria": nombreCategoria};
        ejecutarAjaxJson(parametros,47);
    }else{
        alert("Por favor introduzca un nombre de categoria");
    }
}
 
//Consulta los pedidos en la BD
function consultarPedidosAdmon(){
    var parametros = {"opc": 55};
    ejecutarAjaxJson(parametros,55);
} 

//Carga el html de la tabla en la interfaz del admon
function mostrarTablaPedidosAdmin(){
    var txt2='<div id="tablaPedidosAdmin" >';
    txt2 +='</div>';
    $("#trabajoCentro").html(txt2);
}

//carga los datos a la tabla de pedidos del admin
function cargarDatosTablaPedidosAdmin(filasArreglo){
    //Llenado de filas html
    var fila = "<table class='table table-hover table-striped'>";
    fila +='<thead><tr><th># Pedido</th><th>Estado</th><th>Mesero</th><th>Ver</th></tr></thead>';
    fila += "<tbody>";
    for (var i = 0; i < filasArreglo.length; i++) {
        var estado = filasArreglo[i]["estado"] ;
        var claseEstado = estado.replace(" ","");

        fila +="<tr><td>"+ filasArreglo[i]["idPedido"] +"</td><td class='btn-"+claseEstado+"'>"+ filasArreglo[i]["estado"] +"</td><td>"+ filasArreglo[i]["nombre"] +"</td><td><button class='btn'  onclick='mostrarDetallePedidoAdmin("+ filasArreglo[i]["idPedido"]+")'>Ver</button></td></tr>";
    }
        fila +='</tbody></table>';
        $('#tablaPedidosAdmin').html(fila);
}

//Consulta el detalle del pedido seleccionado en el modulo del admin
function mostrarDetallePedidoAdmin(idPedido){
    var parametros = {"opc" : 56, "idPedido" : idPedido};
    ejecutarAjaxJson(parametros,56);
}

function cargarDetallePedidoAdmin(respuesta){
    //Se cargan los datos en el modal
    var totalPedido = 0;
    //.modal-title
    var titulo = "PEDIDO No. "+ respuesta[0]["idPedido"];

    //.modal-body
    var fila = "<table class='table table-hover table-striped'>";
    fila +='<thead><tr><th>Producto</th><th>Estado</th><th>Cantidad</th><th>Precio</th><th>Valor</th></tr></thead>';
    fila += "<tbody>";
    for (var i = 0; i < respuesta.length; i++) {
        var estado = respuesta[i]["estado"] ;
        var claseEstado = estado.replace(" ","");

        fila +="<tr><td>"+ respuesta[i]["producto"] +"</td><td class='btn-"+claseEstado+"'>"+ respuesta[i]["estado"] +"</td><td>"+ respuesta[i]["cantidad"] +"</td><td>"+ respuesta[i]["Precio"]+"</td><td>"+ respuesta[i]["valor"]+"</td></tr>";
        
        totalPedido = totalPedido +  parseInt(respuesta[i]["valor"]);
    }
    fila +='</tbody></table>';

    //.modal-footer
    var pie = "<h5 class='col-xs-3 col-sm-3 col-md-3 col-lg-3'>Total Pedido:</h5><h5 class='col-xs-3 col-sm-3 col-md-3 col-lg-3'>"+totalPedido+"</h5><h5 class='col-xs-3 col-sm-3 col-md-3 col-lg-3'>Mesero: </h5><h5 class='col-xs-3 col-sm-3 col-md-3 col-lg-3'>"+respuesta[0]["nombre"]+"</h5>";
    pie += "<h5 class='col-xs-3 col-sm-3 col-md-3 col-lg-3'>Fecha: </h5><h5 class='col-xs-3 col-sm-3 col-md-3 col-lg-3'>"+respuesta[0]['fechaPedido']+"</h5><h5 class='col-xs-3 col-sm-3 col-md-3 col-lg-3'>Mesa: </h5><h5 class='col-xs-3 col-sm-3 col-md-3 col-lg-3'>"+respuesta[0]["numMesa"]+"</h5>";

    //Muestra el modal con los detalles
    mostrarModal(titulo,fila,pie);
}

/***************************************************************/
//               GRAFICAS DE ESTADISTICAS
/***************************************************************/

function consultarVentasGenerales(){
    var parametros={"opc": 49};
    ejecutarAjaxJson(parametros,49);
}

function consultarVentasProductos(){
    var parametros={"opc": 50};
    ejecutarAjaxJson(parametros,50);
}

function consultarVentasDiarias(){
    var parametros={"opc": 51};
    ejecutarAjaxJson(parametros,51);
}

function consultarVentasMensuales(){
   var parametros={"opc": 52};
    ejecutarAjaxJson(parametros,52); 
}

function crearStringEstadisticas(response,nombre1,nombre2){
    /*var graficas = [];
    for(var i=0; i < response.length; i++) {
        paula.push({"name" : response[i]["nombre"], "data" : [0,parseInt(response[i]["numeroPedidos"])] })
    }
    graficasEstadisticas(paula);*/

    var graficas = {"name" : 'Pedidos', "data" : []};
    for(var i=0; i < response.length; i++) {
        graficas["data"].push([response[i][nombre1],parseInt(response[i][nombre2])]);
    } 
    graficasBarras(graficas);
}


function graficasBarras(respuesta){
    var txt = '<h1>ESTADÍSTICAS</h1>';

    $("#titulo").html(txt); 

 
    Highcharts.chart('trabajoCentro', {
        chart: {
            type: 'column'
        },

        title: {
            text: 'VENTAS'
        },
        subtitle: {
            text: 'Estadisticas'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Ventas $'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Ventas en pesos'
        },
        series: [{
            name: respuesta.name,
            data: respuesta.data
            ,
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#000000',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    background: '#000000'
                }
            }
        }]
    });

    var txt2 = '<div>';
    txt2 += '   <button id="btnRegistrar" class="btn" type="button" onclick="consultarVentasProductos()">PRODUCTOS</button>';
    txt2 += '   <button id="btnRegistrar" class="btn" type="button" onclick="consultarVentasMensuales()">MENSUALES</button>';
    txt2 += '   <button id="btnRegistrar" class="btn" type="button" onclick="consultarVentasDiarias()">DIARIAS</button>';
    txt2 += ' </div>';

    $("#trabajoSur").html(txt2); 

}



function graficasEstadisticas(texto){ 

    var txt = '<h1>ESTADÍSTICAS</h1>';

    $("#titulo").html(txt); 

    var codigo =  JSON.stringify(texto);


    Highcharts.chart('trabajoCentro', {

    title: {
        text: 'Ventas por mesero diarias'
    },

    subtitle: {
        text: 'Mes: Abril'
    },

    yAxis: {
        title: {
            text: 'ventas por empleado'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },


    series: texto,

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});

var txt2 = '<div>';
    txt2 += '   <button id="btnRegistrar" class="btn" type="button" onclick="ventasMensuales()">MENSUALES</button>';
    txt2 += '   <button id="btnRegistrar" class="btn" type="button">SEMANALES</button>';
    txt2 += ' </div>';

    $("#trabajoSur").html(txt2); 
}


//*************************************/
//ESTADISTICAS VENTAS MENSUALES
/**************************************/
function ventasMensuales(){
 var txt1 ='';
    txt1 += '<div class="btn-group">';
    txt1 += '<button type="button" class="btn btn-primary dropdown-toggle" id="btnVentas" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> MES <span class="glyphicon glyphicon-triangle-bottom"></span></button>';
    txt1 += '   <div class="dropdown-menu" id="dpdVentas">';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Enero\')" >Enero</button>';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Febrero\')">Febrero</button>';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Marzo\')">Marzo</button>';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Abril\')">Abril</button>';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Mayo\')">Mayo</button>';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Junio\')">Junio</button>';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Julio\')">Julio</button>';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Agosto\')">Agosto</button>';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Septiembre\')">Septiembre</button>';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Octubre\')">Octubre</button>';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Noviembre\')">Noviembre</button>';
    txt1 += ' <button class="btn btn-block" onclick="cambiarTextoMes(\'Diciembre\')">Diciembre</button>';
    txt1 += '   </div>';   
    txt1 += '</div>';
  $("#trabajoCentro").html(txt1); 
}
   
function cambiarTextoMes(mes){
    $("#btnVentas").text(mes);     
 } 
  
    
    
    