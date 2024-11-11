package com.habitsup.backendhabitsup.repository;

import org.springframework.data.repository.CrudRepository;

import com.habitsup.backendhabitsup.entity.Recompensa;

public interface RecompensaRepository extends CrudRepository<Recompensa, Integer> {
    // Puedes agregar métodos personalizados aquí si es necesario
}
