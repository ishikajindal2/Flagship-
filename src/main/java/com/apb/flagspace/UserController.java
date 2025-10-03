package com.apb.flagspace;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/api/user/profile")
    @PreAuthorize("hasRole('USER')")
    public String userProfile() {
        return "Welcome USER ";
    }
}
