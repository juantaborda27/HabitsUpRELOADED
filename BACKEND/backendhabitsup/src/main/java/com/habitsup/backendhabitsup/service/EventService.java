package com.habitsup.backendhabitsup.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.habitsup.backendhabitsup.entity.Event;
import com.habitsup.backendhabitsup.repository.EventRepository;
import com.habitsup.backendhabitsup.repository.UserRepository;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    // public List<Event> getAllEventsByUser(Long userId) {
    //      User user = userRepository.findById(userId).orElse(null);
    //      return eventRepository.findByDateAndUserId(null, userId);
    // }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event, Long userId) {
        com.habitsup.backendhabitsup.entity.User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));    
        event.setUser(user);
        event.setCreationDate(LocalDateTime.now());
        return eventRepository.save(event);
     }

    public Event updateEvent(Long id, Event eventDetails) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        event.setTitle(eventDetails.getTitle());
        event.setDescription(eventDetails.getDescription());
        event.setDate(eventDetails.getDate());
        event.setTime(eventDetails.getTime());
        event.setFrequency(eventDetails.getFrequency());
        event.setReminder(eventDetails.isReminder());
        event.setRepeatDays(eventDetails.getRepeatDays());
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public List<Event> getEventsByDate(LocalDateTime date, Long userId) {
        return eventRepository.findByDateAndUserId(date.toLocalDate(), userId);
    }
}
