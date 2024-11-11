package com.habitsup.backendhabitsup.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Frecuencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_Frecuencia;
    private String descripcion_Frecuencia;

    public void setIdFrecuencia(int idFrecuencia){
        this.id_Frecuencia = idFrecuencia;
    }
}
