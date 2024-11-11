package com.habitsup.backendhabitsup.repository;

import org.springframework.data.repository.CrudRepository;

import com.habitsup.backendhabitsup.entity.Estado;

public interface EstadoRepository extends CrudRepository<Estado, Integer> {
    // Puedes agregar métodos personalizados aquí si es necesario
}
