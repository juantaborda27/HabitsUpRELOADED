package com.habitsup.backendhabitsup.repository;

import org.springframework.data.repository.CrudRepository;

import com.habitsup.backendhabitsup.entity.Categoria_Habito;

public interface CategoriaHabitoRepository extends CrudRepository<Categoria_Habito, Integer> {
    // Puedes agregar métodos personalizados aquí si es necesario
}

