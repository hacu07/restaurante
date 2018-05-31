/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import Conexion.Conexion;
import Servicios.InterfazServicios;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.swing.table.DefaultTableModel;
import vista.Interfaz;

/**
 *
 * @author hacu1
 */
public class InterfazControlador implements ActionListener{
    static ResultSet res;
    public Interfaz gui;
    public InterfazServicios servicio;
    
    public InterfazControlador(Interfaz vista, InterfazServicios modelo){
        this.gui = vista;
        this.servicio = modelo;
    }
    
    @Override
    public void actionPerformed(ActionEvent ae) {
        if(ae.getSource() == gui.getComboOficinas()){
            //gui.getTblEmpleados().remove
            borrarFilasTablaOficinas();
            String itemSeleccionado = gui.getComboOficinas().getSelectedItem().toString();
           gui.getLblOficina().setText("Oficina: "+itemSeleccionado);
            
            ResultSet rs = Conexion.ejecutarConsulta("SELECT e.idEmpleado, e.nombre, e.apellido, e.telOficina, e.correoE, e.cargo from empleados e join oficinas on e.idOficina = oficinas.idOficina\n" +
                                                        "where oficinas.ciudad like '"+itemSeleccionado+"'");
            
            DefaultTableModel temp = (DefaultTableModel) gui.getTblEmpleados().getModel();
            try{    
                while(rs.next()){
                    Object nuevo[]= {rs.getInt(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),"--Nombre Jefe --",rs.getString(6)};
                    temp.addRow(nuevo);
                    //gui.getComboGruposProductos().addItem(rs.getString(1));
                }
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
        else if(ae.getSource() == gui.getComboGruposProductos()){
            borrarFilasTablaProductos();
            String itemSeleccionado = "";
            itemSeleccionado = String.valueOf(gui.getComboGruposProductos().getSelectedItem());
            gui.getLblProducto().setText("Producto: "+itemSeleccionado);
            System.out.println("Seleccionado fue: "+itemSeleccionado);
            ResultSet rs = Conexion.ejecutarConsulta("select p.codProducto, p.nombreProducto, p.descripcionProducto, "
                                                        + "p.cantidadStock, p.precioVenta from productos p join "
                                                        + "gruposproductos on p.codGrupo = gruposproductos.codGrupo "
                                                        + "where gruposproductos.nombreGrupo like '"+itemSeleccionado+"'");
            
     
            DefaultTableModel temp = (DefaultTableModel) gui.getTblProductos().getModel();
            try{    
                while(rs.next()){
                    Object nuevo[]= {rs.getInt(1),rs.getString(2),rs.getString(3),rs.getInt(4),rs.getDouble(5)};
                    temp.addRow(nuevo);
                    //gui.getComboGruposProductos().addItem(rs.getString(1));
                }
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
    }
    
    public void borrarFilasTablaOficinas(){
        DefaultTableModel temp = (DefaultTableModel) gui.getTblEmpleados().getModel();
        for (int i = temp.getRowCount() -1; i >= 0; i--){
            temp.removeRow(i);
        }
    }
    
    public void borrarFilasTablaProductos(){
        DefaultTableModel temp = (DefaultTableModel) gui.getTblProductos().getModel();
        for (int i = temp.getRowCount() -1; i >= 0; i--){
            temp.removeRow(i);
        }
    }
    
    public void llenarSelectOficinas(){
        ResultSet rs = Conexion.ejecutarConsulta("select ciudad from oficinas");
        try{    
            while(rs.next()){
                gui.getComboOficinas().addItem(rs.getString(1));
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    
    public void llenarSelectGruposProducto(){
        gui.getComboGruposProductos().removeAllItems();
        ResultSet rs = Conexion.ejecutarConsulta("SELECT nombreGrupo FROM gruposproductos");
        try{    
            while(rs.next()){
                gui.getComboGruposProductos().addItem(rs.getString(1));
            }
        }catch(SQLException e){
            e.printStackTrace();
        }
    }
    
    
    
    
    
    
    
}
