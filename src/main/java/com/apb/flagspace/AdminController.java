package com.apb.flagspace;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @GetMapping("/api/admin/upload")
    @PreAuthorize("hasRole('ADMIN')")
    public String uploadMessage() {
        return "Admin-only: You can upload announcements here!";
    }

    @GetMapping("/api/admin/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String dashboard() {
        return " Admin-only: Leadership dashboard.";
    }
}
