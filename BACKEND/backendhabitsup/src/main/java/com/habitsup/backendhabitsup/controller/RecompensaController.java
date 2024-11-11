package com.habitsup.backendhabitsup.controller;

import com.habitsup.backendhabitsup.entity.Recompensa;
// import com.habitsup.backendhabitsup.entity.Usuario;
import com.habitsup.backendhabitsup.service.RecompensaService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// import java.util.Optional;

@RestController
@RequestMapping("/api/reco")
public class RecompensaController {

    @Autowired
    private RecompensaService recompensaService;

    // @GetMapping
    // public ResponseEntity<Iterable<Recompensa>> getAllRecompensas() {
    //     return new ResponseEntity<>(recompensaService.findAll(), HttpStatus.OK);
    // }

    // @GetMapping("/recompensa")
    // public ResponseEntity<Recompensa> getRecompensaById(@PathVariable Integer id) {
    //     Optional<Recompensa> recompensa = recompensaService.findById(id);
    //     return recompensa.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    // }

    // @PostMapping
    // public ResponseEntity<Recompensa> createRecompensa(@RequestBody Recompensa recompensa) {
    //     Recompensa newRecompensa = recompensaService.save(recompensa);
    //     return new ResponseEntity<>(newRecompensa, HttpStatus.CREATED);
    // }

    // @PutMapping("/recompensa")
    // public ResponseEntity<Recompensa> updateRecompensa(@PathVariable Integer id, @RequestBody Recompensa recompensaDetails) {
    //     Optional<Recompensa> recompensa = recompensaService.findById(id);
    //     if (recompensa.isPresent()) {
    //         Recompensa existingRecompensa = recompensa.get();
    //         existingRecompensa.setMensaje_Recompensa(recompensaDetails.getMensajeRecompensa());
    //         //existingRecompensa.setPuntosRequeridos(recompensaDetails.getPuntosRequeridos());
    //         Recompensa updatedRecompensa = recompensaService.save(existingRecompensa);
    //         return new ResponseEntity<>(updatedRecompensa, HttpStatus.OK);
    //     } else {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    // }

    // @DeleteMapping("/recompensa")
    // public ResponseEntity<HttpStatus> deleteRecompensa(@PathVariable Integer id) {
    //     recompensaService.deleteById(id);
    //     return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    // }

    // //METODO PROFESOR
    @GetMapping("/recompensaList")
    public ResponseEntity<List<Recompensa>> getRecompensas(){
        return ResponseEntity.ok().body(recompensaService.getRecompensas());
    }
    // METODO PROFESOR
}
