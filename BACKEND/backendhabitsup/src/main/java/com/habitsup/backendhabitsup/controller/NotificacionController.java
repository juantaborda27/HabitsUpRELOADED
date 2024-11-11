package com.habitsup.backendhabitsup.controller;

import com.habitsup.backendhabitsup.entity.Notificacion;
import com.habitsup.backendhabitsup.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// import java.util.Optional;

@RestController
@RequestMapping("/api/notf")
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    // @GetMapping
    // public ResponseEntity<Iterable<Notificacion>> getAllNotificaciones() {
    //     return new ResponseEntity<>(notificacionService.findAll(), HttpStatus.OK);
    // }

    // @GetMapping("/notificacion")
    // public ResponseEntity<Notificacion> getNotificacionById(@PathVariable Integer id) {
    //     Optional<Notificacion> notificacion = notificacionService.findById(id);
    //     return notificacion.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    // }

    // @PostMapping
    // public ResponseEntity<Notificacion> createNotificacion(@RequestBody Notificacion notificacion) {
    //     Notificacion newNotificacion = notificacionService.save(notificacion);
    //     return new ResponseEntity<>(newNotificacion, HttpStatus.CREATED);
    // }

    // @PutMapping("/notificacion")
    // public ResponseEntity<Notificacion> updateNotificacion(@PathVariable Integer id, @RequestBody Notificacion notificacionDetails) {
    //     Optional<Notificacion> notificacion = notificacionService.findById(id);
    //     if (notificacion.isPresent()) {
    //         Notificacion existingNotificacion = notificacion.get();
    //         existingNotificacion.setMensaje_Recompensa(notificacionDetails.getMensajeRecompensa());
    //         existingNotificacion.setHabito(notificacionDetails.getHabito());
    //         existingNotificacion.setEstado(notificacionDetails.getEstado());
    //         Notificacion updatedNotificacion = notificacionService.save(existingNotificacion);
    //         return new ResponseEntity<>(updatedNotificacion, HttpStatus.OK);
    //     } else {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    // }

    // @DeleteMapping("/notificacion")
    // public ResponseEntity<HttpStatus> deleteNotificacion(@PathVariable Integer id) {
    //     notificacionService.deleteById(id);
    //     return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    // }

    @GetMapping("/notificacionList")
    public ResponseEntity<List<Notificacion>> getNotificacion(){
        return ResponseEntity.ok().body(notificacionService.geNotificacions());
    }
}
