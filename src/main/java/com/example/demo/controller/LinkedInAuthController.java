package com.example.demo.controller;

import com.example.demo.service.LinkedInOAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/auth/linkedin")
public class LinkedInAuthController {

    private final LinkedInOAuthService linkedInOAuthService;

    @Autowired
    public LinkedInAuthController(LinkedInOAuthService linkedInOAuthService) {
        this.linkedInOAuthService = linkedInOAuthService;
    }

    // 1️⃣ Demo login: shows posts authored by CFO/CTO/CCO
    @GetMapping("/login-demo")
    public String demoLogin() {
        List<String> posts = List.of(
                "CFO Ishika: Q3 Strategy Update",
                "CTO John: Tech Roadmap Planning",
                "CCO Alice: Global Expansion Goals"
        );
        return generateFeed(posts, true);
    }

    // 2️⃣ Real OAuth login: redirects user to LinkedIn login page
    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        String authorizationUrl = linkedInOAuthService.getAuthorizationUrl();
        response.sendRedirect(authorizationUrl);
    }

    // 3️⃣ LinkedIn callback endpoint
    @GetMapping("/callback")
    public String callback(@RequestParam(value = "code", required = false) String code) {
        List<String> posts;
        boolean isDemo = false;

        try {
            if (code != null) {
                // Placeholder: in real app, fetch posts from LinkedIn API (needs approval)
                posts = linkedInOAuthService.fetchPostsFromCLevel(); 
            } else {
                posts = List.of(
                        "CFO Ishika: Q3 Strategy Update",
                        "CTO John: Tech Roadmap Planning",
                        "CCO Alice: Global Expansion Goals"
                );
                isDemo = true;
            }
        } catch (Exception e) {
            posts = List.of(
                    "CFO Ishika: Q3 Strategy Update",
                    "CTO John: Tech Roadmap Planning",
                    "CCO Alice: Global Expansion Goals"
            );
            isDemo = true;
        }

        return generateFeed(posts, isDemo);
    }

    // 4️⃣ Generate leadership feed
    private String generateFeed(List<String> posts, boolean isDemo) {
        StringBuilder feed = new StringBuilder();
        feed.append(isDemo ? "💡 Demo Mode\n" : "✅ Real LinkedIn Data\n");
        feed.append("Leadership Feed (CFO/CTO/CCO posts):\n");
        posts.forEach(post -> feed.append("- ").append(post).append("\n"));
        return feed.toString();
    }

    @GetMapping("/")
    public String home() {
        return "LinkedIn Demo App Running. Use /auth/linkedin/login-demo for demo feed.";
    }

    @GetMapping("/error")
    public String error() {
        return "Something went wrong. Use /auth/linkedin/login-demo to view demo feed.";
    }
}