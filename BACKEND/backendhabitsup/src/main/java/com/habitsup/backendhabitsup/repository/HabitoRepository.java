package com.habitsup.backendhabitsup.repository;

import org.springframework.data.repository.CrudRepository;

import com.habitsup.backendhabitsup.entity.Habito;

public interface HabitoRepository extends CrudRepository<Habito, Integer> {
    // Puedes agregar métodos personalizados aquí si es necesario
}

