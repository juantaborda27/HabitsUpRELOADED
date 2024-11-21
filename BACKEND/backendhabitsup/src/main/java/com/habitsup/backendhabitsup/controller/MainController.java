package main.java.com.habitsup.backendhabitsup.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String home() {
        return "index"; // Nombre del archivo HTML (sin la extensión .html)
    }
}
