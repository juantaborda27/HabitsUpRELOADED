package com.habitsup.backendhabitsup.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.habitsup.backendhabitsup.entity.Habito;
import com.habitsup.backendhabitsup.entity.User;
import com.habitsup.backendhabitsup.repository.HabitRepositorio;
import com.habitsup.backendhabitsup.repository.UserRepository;

@Service
public class HabitService {

    @Autowired
    private HabitRepositorio habitRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Habito> getAllHabitsByUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return habitRepository.findByUser(user);
    }

    public Optional<Habito> getHabitById(Long id) {
        return habitRepository.findById(id);
    }

    public Habito createHabit(Habito habit, Long userId) {
        com.habitsup.backendhabitsup.entity.User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));    
        habit.setUser(user);
        habit.setCreationDate(LocalDateTime.now());
        return habitRepository.save(habit);
     }

    public Habito updateHabit(Long id, Habito habitDetails) {
        Habito habit = habitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habit not found with id: " + id));
        habit.setName(habitDetails.getName());
        habit.setDescription(habitDetails.getDescription());
        habit.setTime(habitDetails.getTime());
        habit.setFrequency(habitDetails.getFrequency());
        habit.setReminder(habitDetails.isReminder());
        return habitRepository.save(habit);
    }

    public void deleteHabit(Long id) {
        habitRepository.deleteById(id);
    }

    public Habito completeHabit(Long id) {
        Habito habit = habitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Habit not found with id: " + id));
        habit.setStreak(habit.getStreak() + 1);
        habit.setLastCompletedDate(LocalDateTime.now().toLocalDate());
        return habitRepository.save(habit);
    }

}
