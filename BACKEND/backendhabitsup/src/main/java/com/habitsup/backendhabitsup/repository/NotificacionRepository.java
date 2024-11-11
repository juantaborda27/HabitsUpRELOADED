package com.habitsup.backendhabitsup.repository;

import org.springframework.data.repository.CrudRepository;

import com.habitsup.backendhabitsup.entity.Notificacion;

public interface NotificacionRepository extends CrudRepository<Notificacion, Integer> {
    // Puedes agregar métodos personalizados aquí si es necesario
}

