package com.habitsup.backendhabitsup.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Notificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_Notificacion;
    public String mensaje_Recompensa;
    // Getters and Setters

    @ManyToOne 
    @JoinColumn(name = "idHabito") 
    private Habito habito; 
    
    @ManyToOne 
    @JoinColumn(name = "idEstado")
    private Estado estado;

    public String getMensajeRecompensa() {
        return this.mensaje_Recompensa;
    }    
}
