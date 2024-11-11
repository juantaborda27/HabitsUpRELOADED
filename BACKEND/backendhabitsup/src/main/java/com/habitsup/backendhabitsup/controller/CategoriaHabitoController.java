package com.habitsup.backendhabitsup.controller;

import com.habitsup.backendhabitsup.entity.Categoria_Habito;
import com.habitsup.backendhabitsup.service.CategoriaHabitoService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import java.util.Optional;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaHabitoController {

    @Autowired
    private CategoriaHabitoService categoriaHabitoService;

    @GetMapping("/categoriaList")
    public Iterable<Categoria_Habito> getAllCategorias() {
        return categoriaHabitoService.findAll();
    }

    // @GetMapping("/categoria_habito")
    // public ResponseEntity<Categoria_Habito> getCategoriaById(@PathVariable Integer id) {
    //     Optional<Categoria_Habito> categoria = categoriaHabitoService.findById(id);
    //     return categoria.map(ResponseEntity::ok)
    //                     .orElseGet(() -> ResponseEntity.notFound().build());
    // }

    // @PostMapping
    // public Categoria_Habito createCategoria(@RequestBody Categoria_Habito categoria) {
    //     return categoriaHabitoService.save(categoria);
    // }

    // @PutMapping("/categoria_habito")
    // public ResponseEntity<Categoria_Habito> updateCategoria(@PathVariable Integer id, @RequestBody Categoria_Habito categoriaDetails) {
    //     Optional<Categoria_Habito> categoria = categoriaHabitoService.findById(id);
    //     if (categoria.isPresent()) {
    //         categoriaDetails.setIdCategoriaHabito(id);
    //         return ResponseEntity.ok(categoriaHabitoService.save(categoriaDetails));
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // @DeleteMapping("/categoria_habito")
    // public ResponseEntity<Void> deleteCategoria(@PathVariable Integer id) {
    //     categoriaHabitoService.deleteById(id);
    //     return ResponseEntity.noContent().build();
    // }
}
