/*
    Clase principal donde se ejecuta los demas comandos para interactuar con el usuario
 */
package wsprueba_hach;

import Conexion.Conexion;
import Servicios.InterfazServicios;
import controlador.InterfazControlador;
import java.sql.SQLException;
import vista.Interfaz;
/**
 *
 * @author hacu1
 */
public class WSPrueba_HACH {
    //Constructor
    public WSPrueba_HACH() throws SQLException, ClassNotFoundException{
        Conexion.obtener();
    }
    
    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        WSPrueba_HACH ws = new WSPrueba_HACH();
        
        //Servicios
        InterfazServicios servicio = new InterfazServicios();
        
        //vista
        Interfaz interfaz = new Interfaz();
        //controlador 
        InterfazControlador ctrl = new InterfazControlador(interfaz,servicio);
        
        //agregar escuchas
        interfaz.fijarEscuchas(ctrl);
        
        ctrl.llenarSelectOficinas();
        ctrl.llenarSelectGruposProducto();
        interfaz.setVisible(true);
    }
    
}
