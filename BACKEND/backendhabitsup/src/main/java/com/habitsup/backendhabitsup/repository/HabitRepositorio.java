package com.habitsup.backendhabitsup.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.habitsup.backendhabitsup.entity.Habito;
import com.habitsup.backendhabitsup.entity.User;

public interface HabitRepositorio extends JpaRepository<Habito, Long>{
    List<Habito> findByUser(User user); // Cambia "Usuario" por "User" si ese es el nombre correcto

}
