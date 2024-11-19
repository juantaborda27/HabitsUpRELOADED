package com.habitsup.backendhabitsup.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.habitsup.backendhabitsup.entity.Event;
import com.habitsup.backendhabitsup.entity.User;

public interface EventRepository extends JpaRepository<Event, Long>{
    List<Event> findByUser_Id(Long userId);
    List<Event> findByDateAndUserId(LocalDate date, Long userId);
    List<Event> findByUser(User user);
}
