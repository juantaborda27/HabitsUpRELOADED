package com.habitsup.backendhabitsup.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.habitsup.backendhabitsup.entity.HabitHistory;
import com.habitsup.backendhabitsup.entity.Habito;
import com.habitsup.backendhabitsup.entity.User;

public interface HabitHistoryRepository extends JpaRepository<HabitHistory, Long> {
    List<HabitHistory> findByHabitId(Long habitId);
    List<HabitHistory> findByCompletionDateBetweenAndHabit_UserId(LocalDateTime from, LocalDateTime to, Long userId);
    List<HabitHistory> findByHabit(Habito habit);

}
