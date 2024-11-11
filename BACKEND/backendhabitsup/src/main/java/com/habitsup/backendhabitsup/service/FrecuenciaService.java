package com.habitsup.backendhabitsup.service;

import com.habitsup.backendhabitsup.entity.Frecuencia;
import com.habitsup.backendhabitsup.repository.FrecuenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FrecuenciaService {

    @Autowired
    private FrecuenciaRepository frecuenciaRepository;

    public Iterable<Frecuencia> findAll() {
        return frecuenciaRepository.findAll();
    }

    public Optional<Frecuencia> findById(Integer id) {
        return frecuenciaRepository.findById(id);
    }

    public Frecuencia save(Frecuencia frecuencia) {
        return frecuenciaRepository.save(frecuencia);
    }

    public void deleteById(Integer id) {
        frecuenciaRepository.deleteById(id);
    }

    public List<Frecuencia> getFrecuencias(){
        return (List<Frecuencia>) frecuenciaRepository.findAll();
    }
}

