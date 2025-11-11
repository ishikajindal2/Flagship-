package com.apb.flagspace;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.HashMap;

@RestController
public class UserController {

    private final HomeController homeController;

    // Constructor injection for HomeController
    public UserController(HomeController homeController) {
        this.homeController = homeController;
    }

    @GetMapping("/api/user/profile")
    @PreAuthorize("hasRole('USER')")
    public Map<String, Object> userProfile() {

        Map<String, Object> homeData = homeController.getHomePageData();


        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome USER!");
        response.putAll(homeData);

        return response;
    }
}
