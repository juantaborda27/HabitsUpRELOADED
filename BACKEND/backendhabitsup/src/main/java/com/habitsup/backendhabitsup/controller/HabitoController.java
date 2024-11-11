package com.habitsup.backendhabitsup.controller;

import com.habitsup.backendhabitsup.entity.Habito;
import com.habitsup.backendhabitsup.service.HabitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import java.util.Optional;

@RestController
@RequestMapping("/api/habit")
public class HabitoController {

    @Autowired
    private HabitoService habitoService;

    @GetMapping("/habitList")
    public ResponseEntity<Iterable<Habito>> getAllHabitos() {
        return new ResponseEntity<>(habitoService.findAll(), HttpStatus.OK);
    }

    // @GetMapping("/habito")
    // public ResponseEntity<Habito> getHabitoById(@PathVariable Integer id) {
    //     Optional<Habito> habito = habitoService.findById(id);
    //     return habito.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    // }

    // @PostMapping
    // public ResponseEntity<Habito> createHabito(@RequestBody Habito habito) {
    //     Habito newHabito = habitoService.save(habito);
    //     return new ResponseEntity<>(newHabito, HttpStatus.CREATED);
    // }

    // @PutMapping("/habito")
    // public ResponseEntity<Habito> updateHabito(@PathVariable Integer id, @RequestBody Habito habitoDetails) {
    //     Optional<Habito> habito = habitoService.findById(id);
    //     if (habito.isPresent()) {
    //         Habito existingHabito = habito.get();
    //         existingHabito.setNombre(habitoDetails.getNombre());
    //         existingHabito.setFrecuencia(habitoDetails.getFrecuencia());
    //         existingHabito.setCategoriaHabito(habitoDetails.getCategoriaHabito());
    //         existingHabito.setEstado(habitoDetails.getEstado());
    //         Habito updatedHabito = habitoService.save(existingHabito);
    //         return new ResponseEntity<>(updatedHabito, HttpStatus.OK);
    //     } else {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    // }

    // @DeleteMapping("/habito")
    // public ResponseEntity<HttpStatus> deleteHabito(@PathVariable Integer id) {
    //     habitoService.deleteById(id);
    //     return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    // }
}
