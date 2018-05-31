/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Conexion;

import com.mysql.jdbc.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.swing.JOptionPane;

/**
 *
 * @author hacu1
 */
public class Conexion {
    private static Connection cnx = null;
   
   public static Connection obtener() throws SQLException, ClassNotFoundException {
      if (cnx == null) {
         try {
            Class.forName("com.mysql.jdbc.Driver");
            cnx = (Connection) DriverManager.getConnection("jdbc:mysql://localhost/sesion1", "root", "");
            System.out.println("Conexion exitosa a BD");//imprime por consola
         } catch (SQLException ex) {
            throw new SQLException(ex);
         } catch (ClassNotFoundException ex) {
            throw new ClassCastException(ex.getMessage());
         }
      }
      return cnx;
   }
   
   
   public static void cerrar() throws SQLException {
      if (cnx != null) {
         cnx.close();
      }
   }
  //Metodo para realizar actualizaciones en la BD - INSERTAR, ELIMINAR, ACTUALIZAR -
  public static int ejecutarActualizacion(String sql) 
  {  Statement st = null;
     try 
     {  st = cnx.createStatement();
	int res = st.executeUpdate(sql);
	return res;
     } catch (SQLException e) 
       {  e.printStackTrace();
          JOptionPane.showMessageDialog(null,e);
	  return 0;
       } finally 
         {  try 
            {  if (st != null) 
               {  st.close();
	       }
            } catch (SQLException e) 
              {  e.printStackTrace();
              } 
	 }
  }

  //Metodo para realizar consultas en la BD
  public static ResultSet ejecutarConsulta(String sql) 
  {  Statement st = null;
     try 
     {  st = cnx.createStatement();
	ResultSet res = st.executeQuery(sql);
	return res;
     } catch (SQLException e) 
       {  e.printStackTrace();
	  return null;
       } 
  }
}
