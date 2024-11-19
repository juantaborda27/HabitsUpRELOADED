package com.habitsup.backendhabitsup.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private LocalDate date;

    private LocalTime time;

    @Column(nullable = false)
    private String frequency;

    private boolean reminder;

    @Column(name = "repeat_days")
    private int repeatDays;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

}
