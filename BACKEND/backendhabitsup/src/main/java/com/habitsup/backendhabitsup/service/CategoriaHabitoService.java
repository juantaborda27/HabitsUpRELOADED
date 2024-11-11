package com.habitsup.backendhabitsup.service;
import com.habitsup.backendhabitsup.entity.Categoria_Habito;
import com.habitsup.backendhabitsup.repository.CategoriaHabitoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaHabitoService {

    @Autowired
    private CategoriaHabitoRepository categoriaHabitoRepository;

    public Iterable<Categoria_Habito> findAll() {
        return categoriaHabitoRepository.findAll();
    }

    public Optional<Categoria_Habito> findById(Integer id) {
        return categoriaHabitoRepository.findById(id);
    }

    public Categoria_Habito save(Categoria_Habito categoriaHabito) {
        return categoriaHabitoRepository.save(categoriaHabito);
    }

    public void deleteById(Integer id) {
        categoriaHabitoRepository.deleteById(id);
    }

    public List<Categoria_Habito> getCategoria_Habitos(){
        return (List<Categoria_Habito>) categoriaHabitoRepository.findAll();
    }
}
