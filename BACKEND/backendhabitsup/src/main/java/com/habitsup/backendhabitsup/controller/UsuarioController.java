package com.habitsup.backendhabitsup.controller;

import com.habitsup.backendhabitsup.entity.Usuario;
import com.habitsup.backendhabitsup.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/users")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // //METODO PROFESOR
    @GetMapping("/usuariosList")
    public ResponseEntity<List<Usuario>> getUsuarios(){
        return ResponseEntity.ok().body(usuarioService.getUsuarios());
    }
    
    // METODO PROFESOR
    @PostMapping("/usuariosave")
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario){
        return ResponseEntity.ok().body(usuarioService.save(usuario));
    }

    @PostMapping("/authuser")
    public ResponseEntity<Usuario> authenticate(@RequestBody Usuario loginRequest) {
        Usuario usuario = usuarioService.authenticate(loginRequest.getCorreoElectronico(), loginRequest.getPassword());
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(401).build();
        }
    }
    
}

