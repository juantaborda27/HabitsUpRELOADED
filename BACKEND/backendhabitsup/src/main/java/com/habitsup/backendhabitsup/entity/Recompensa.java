package com.habitsup.backendhabitsup.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Recompensa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_Recompensa;
    public String mensaje_Recompensa;
    public Integer puntos_Requeridos;

    public String getMensajeRecompensa() {
        return this.mensaje_Recompensa;
    }

    public int getPuntosRequeridos() {
        return this.puntos_Requeridos;
    }
}
