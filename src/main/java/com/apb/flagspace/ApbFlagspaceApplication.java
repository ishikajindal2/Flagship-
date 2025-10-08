package com.apb.flagspace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication(scanBasePackages = "com.apb.flagspace")
public class ApbFlagspaceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApbFlagspaceApplication.class, args);
    }
}