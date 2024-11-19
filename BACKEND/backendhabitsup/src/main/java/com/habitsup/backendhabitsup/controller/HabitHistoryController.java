package com.habitsup.backendhabitsup.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.habitsup.backendhabitsup.entity.HabitHistory;
import com.habitsup.backendhabitsup.service.HabitHistoryService;

@RestController
@RequestMapping("/api/habit-history")
public class HabitHistoryController {
    @Autowired
    private HabitHistoryService habitHistoryService;

    // @GetMapping("/habit/{habitId}")
    // public List<HabitHistory> getHabitHistoryByHabitId(@PathVariable Long habitId) {
    //     return habitHistoryService.getHabitHistoryByHabitId(habitId);
    // }

    @PostMapping("/habit/{habitId}")
    public ResponseEntity<HabitHistory> createHabitHistory(@PathVariable Long habitId, @RequestParam String status) {
        return ResponseEntity.ok(habitHistoryService.createHabitHistory(habitId, status));
    }

    @GetMapping("/date-range")
    public List<HabitHistory> getHabitHistoryByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to,
            @RequestParam Long userId) {
        return habitHistoryService.getHabitHistoryByDateRange(from, to, userId);
    }
}
