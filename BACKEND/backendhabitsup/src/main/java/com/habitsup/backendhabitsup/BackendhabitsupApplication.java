package com.habitsup.backendhabitsup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.habitsup.backendhabitsup.entity")  
public class BackendhabitsupApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendhabitsupApplication.class, args);
	}

}
