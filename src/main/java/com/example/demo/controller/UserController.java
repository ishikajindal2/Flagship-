package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import io.jsonwebtoken.Claims;
import com.example.demo.security.JwtUtil;
import com.example.demo.repository.userrepository;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins="http://localhost:5173")
public class UserController {
	@Autowired
    private final JwtUtil jwtUtil;
    private final userrepository repo;

    public UserController(JwtUtil j, userrepository r) {
        this.jwtUtil = j; this.repo = r;
    }

    @GetMapping("/me")
    public Object me(@RequestHeader("Authorization") String auth) {
    	try {
    		String token = auth.replace("Bearer ", "");
    		Claims claims = jwtUtil.parseToken(token);

    		Object uidObj = claims.get("uid");
    		Long uid = (uidObj instanceof Number) ? ((Number) uidObj).longValue() : Long.valueOf(uidObj.toString());

    		return repo.findById(uid)
    		           .orElseThrow(() -> new RuntimeException("User not found"));

        } catch (Exception e) {
            return Map.of("error","Invalid token");
        }
    }
}
