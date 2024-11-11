package com.habitsup.backendhabitsup.service;

import com.habitsup.backendhabitsup.entity.Notificacion;
import com.habitsup.backendhabitsup.repository.NotificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificacionService {

    @Autowired
    private NotificacionRepository notificacionRepository;

    public Iterable<Notificacion> findAll() {
        return notificacionRepository.findAll();
    }

    public Optional<Notificacion> findById(Integer id) {
        return notificacionRepository.findById(id);
    }

    public Notificacion save(Notificacion notificacion) {
        return notificacionRepository.save(notificacion);
    }

    public void deleteById(Integer id) {
        notificacionRepository.deleteById(id);
    }

    public List<Notificacion> geNotificacions(){
        return (List<Notificacion>) notificacionRepository.findAll();
    }
}

