package com.habitsup.backendhabitsup.controller;

import com.habitsup.backendhabitsup.entity.Estado;
import com.habitsup.backendhabitsup.service.EstadoService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import java.util.Optional;

@RestController
@RequestMapping("/api/est")
public class EstadoController {

    @Autowired
    private EstadoService estadoService;

    @GetMapping("/estadoList")
    public Iterable<Estado> getAllEstados() {
        return estadoService.findAll();
    }

    // @GetMapping("/estado")
    // public ResponseEntity<Estado> getEstadoById(@PathVariable Integer id) {
    //     Optional<Estado> estado = estadoService.findById(id);
    //     return estado.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    // }

    // @PostMapping
    // public Estado createEstado(@RequestBody Estado estado) {
    //     return estadoService.save(estado);
    // }

    // @PutMapping("/estado")
    // public ResponseEntity<Estado> updateEstado(@PathVariable Integer id, @RequestBody Estado estadoDetails) {
    //     Optional<Estado> estado = estadoService.findById(id);
    //     if (estado.isPresent()) {
    //         estadoDetails.setIdEstado(id);
    //         return ResponseEntity.ok(estadoService.save(estadoDetails));
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // @DeleteMapping("/estado")
    // public ResponseEntity<Void> deleteEstado(@PathVariable Integer id) {
    //     estadoService.deleteById(id);
    //     return ResponseEntity.noContent().build();
    // }
}

