package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")   // maps to http://localhost:9090/
    public String home() {
        return "✅ Spring Boot is running successfully!";
    }
}

