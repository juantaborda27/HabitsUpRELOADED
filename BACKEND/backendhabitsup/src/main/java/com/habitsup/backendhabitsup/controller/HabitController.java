package com.habitsup.backendhabitsup.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.habitsup.backendhabitsup.entity.Habito;
import com.habitsup.backendhabitsup.service.HabitService;

@RestController
@RequestMapping("/api/habits")
public class HabitController {
    @Autowired
    private HabitService habitService;

    @GetMapping("/listhabits")
    public List<Habito> getAllHabits(@PathVariable Long userId) {
        return habitService.getAllHabitsByUser(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Habito> getHabitById(@PathVariable Long id) {
        return habitService.getHabitById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Habito> createHabit(@RequestBody Habito habit, @RequestParam Long userId) {
        return ResponseEntity.ok(habitService.createHabit(habit, userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Habito> updateHabit(@PathVariable Long id, @RequestBody Habito habitDetails) {
        return ResponseEntity.ok(habitService.updateHabit(id, habitDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHabit(@PathVariable Long id) {
        habitService.deleteHabit(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Habito> completeHabit(@PathVariable Long id) {
        return ResponseEntity.ok(habitService.completeHabit(id));
    }
}
