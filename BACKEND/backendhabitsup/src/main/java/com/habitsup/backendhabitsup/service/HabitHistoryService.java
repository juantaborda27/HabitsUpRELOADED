package com.habitsup.backendhabitsup.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.habitsup.backendhabitsup.entity.HabitHistory;
import com.habitsup.backendhabitsup.entity.Habito;
import com.habitsup.backendhabitsup.entity.User;
import com.habitsup.backendhabitsup.repository.HabitHistoryRepository;
import com.habitsup.backendhabitsup.repository.HabitRepositorio;
import com.habitsup.backendhabitsup.repository.UserRepository;

@Service
public class HabitHistoryService {
    @Autowired
    private HabitHistoryRepository habitHistoryRepository;

    @Autowired
    private HabitRepositorio habitRepository;

    @Autowired
    private UserRepository userRepository;

    // public List<HabitHistory> getHabitHistoryByHabitId(Long habitId) {
    //     User user = userRepository.findById(habitId).orElse(null);
    //     return habitHistoryRepository.findByUser(user);
    // }

    public HabitHistory createHabitHistory(Long habitId, String status) {
        Habito habit = habitRepository.findById(habitId)
                .orElseThrow(() -> new RuntimeException("Habit not found with id: " + habitId));
        HabitHistory habitHistory = new HabitHistory();
        habitHistory.setHabit(habit);
        habitHistory.setStatus(status);
        habitHistory.setCompletionDate(LocalDateTime.now());
        return habitHistoryRepository.save(habitHistory);
    }

    public List<HabitHistory> getHabitHistoryByDateRange(LocalDateTime from, LocalDateTime to, Long userId) {
        return habitHistoryRepository.findByCompletionDateBetweenAndHabit_UserId(from, to, userId);
    }
}
