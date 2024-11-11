package com.habitsup.backendhabitsup.service;

import com.habitsup.backendhabitsup.entity.Recompensa;
import com.habitsup.backendhabitsup.repository.RecompensaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecompensaService {

    @Autowired
    private RecompensaRepository recompensaRepository;

    public Iterable<Recompensa> findAll() {
        return recompensaRepository.findAll();
    }

    public Optional<Recompensa> findById(Integer id) {
        return recompensaRepository.findById(id);
    }

    public Recompensa save(Recompensa recompensa) {
        return recompensaRepository.save(recompensa);
    }

    public void deleteById(Integer id) {
        recompensaRepository.deleteById(id);
    }

    public List<Recompensa> getRecompensas(){
        return (List<Recompensa>) recompensaRepository.findAll();
    }
}
