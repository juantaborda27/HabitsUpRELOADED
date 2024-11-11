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
public class Habito {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer idHabito; 
    private String nombre; 

    @ManyToOne 
    @JoinColumn(name = "idFrecuencia") 
    private Frecuencia frecuencia; 

    @ManyToOne 
    @JoinColumn(name = "idCategoriaHabito") 
    private Categoria_Habito categoriaHabito; 
    
    @ManyToOne 
    @JoinColumn(name = "idEstado") 
    private Estado estado;


}
