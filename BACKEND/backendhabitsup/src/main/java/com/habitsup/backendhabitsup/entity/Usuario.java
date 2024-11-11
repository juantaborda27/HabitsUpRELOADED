package com.habitsup.backendhabitsup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_Usuario;

    @Column(name = "correoElectronico", nullable = true, length = 500)
    public String correoElectronico;
    public String password;

    @ManyToOne 
    @JoinColumn(name = "id_Habito") 
    private Habito habito;
}
