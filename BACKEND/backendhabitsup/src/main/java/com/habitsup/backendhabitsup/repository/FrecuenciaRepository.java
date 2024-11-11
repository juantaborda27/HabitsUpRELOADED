package com.habitsup.backendhabitsup.repository;

import org.springframework.data.repository.CrudRepository;

import com.habitsup.backendhabitsup.entity.Frecuencia;

public interface FrecuenciaRepository extends CrudRepository<Frecuencia, Integer> {
    // Puedes agregar métodos personalizados aquí si es necesario
}
