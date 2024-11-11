package com.habitsup.backendhabitsup.controller;

import com.habitsup.backendhabitsup.entity.Frecuencia;
import com.habitsup.backendhabitsup.service.FrecuenciaService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import java.util.Optional;

@RestController
@RequestMapping("/api/frec")
public class FrecuenciaController {

    @Autowired
    private FrecuenciaService frecuenciaService;

    @GetMapping("/frecuenciaList")
    public Iterable<Frecuencia> getAllFrecuencias() {
        return frecuenciaService.findAll();
    }

    // @GetMapping("/frecuencia")
    // public ResponseEntity<Frecuencia> getFrecuenciaById(@PathVariable Integer id) {
    //     Optional<Frecuencia> frecuencia = frecuenciaService.findById(id);
    //     return frecuencia.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    // }

    // @PostMapping
    // public Frecuencia createFrecuencia(@RequestBody Frecuencia frecuencia) {
    //     return frecuenciaService.save(frecuencia);
    // }

    // @PutMapping("/frecuencia")
    // public ResponseEntity<Frecuencia> updateFrecuencia(@PathVariable Integer id, @RequestBody Frecuencia updatedFrecuencia) {
    //     Optional<Frecuencia> frecuencia = frecuenciaService.findById(id);
    //     if (frecuencia.isPresent()) {
    //         updatedFrecuencia.setIdFrecuencia(id);
    //         return ResponseEntity.ok(frecuenciaService.save(updatedFrecuencia));
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // @DeleteMapping("/frecuencia")
    // public ResponseEntity<Void> deleteFrecuencia(@PathVariable Integer id) {
    //     frecuenciaService.deleteById(id);
    //     return ResponseEntity.noContent().build();
    // }
}

