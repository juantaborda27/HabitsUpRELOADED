package com.habitsup.backendhabitsup.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.habitsup.backendhabitsup.entity.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
    // Método personalizado para encontrar un usuario por correo electrónico
    Optional<Usuario> findByCorreoElectronico(String correoElectronico);
    Usuario findByCorreoElectronicoAndPassword(String correoElectronico, String password);
}

