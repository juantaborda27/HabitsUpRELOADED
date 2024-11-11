package com.habitsup.backendhabitsup.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Categoria_Habito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_Categoria_Habito;
    public String descripcion_Categria;

    public void setIdCategoriaHabito(Integer id) {
        this.id_Categoria_Habito = id;
    }
    
}
