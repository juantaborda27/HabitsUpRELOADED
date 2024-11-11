package com.habitsup.backendhabitsup.service;

import com.habitsup.backendhabitsup.entity.Habito;
import com.habitsup.backendhabitsup.repository.HabitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HabitoService {

    @Autowired
    private HabitoRepository habitoRepository;

    public Iterable<Habito> findAll() {
        return habitoRepository.findAll();
    }

    public Optional<Habito> findById(Integer id) {
        return habitoRepository.findById(id);
    }

    public Habito save(Habito habito) {
        return habitoRepository.save(habito);
    }

    public void deleteById(Integer id) {
        habitoRepository.deleteById(id);
    }

    public List<Habito> geHabitos(){
        return (List<Habito>) habitoRepository.findAll();
    }
}
