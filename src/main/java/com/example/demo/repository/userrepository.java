package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.example.demo.model.user;

public interface userrepository extends JpaRepository<user, Long> {
    Optional<user> findByLinkedinId(String linkedinId);
}

