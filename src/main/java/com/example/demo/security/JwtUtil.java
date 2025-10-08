package com.example.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;
@Component
public class JwtUtil  {

    // Generate a secret key (you should store this safely in config)
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Generate JWT token with userId as claim
    public String generateToken(Long userId) {
        return Jwts.builder()
                .claim("uid", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour expiry
                .signWith(secretKey)
                .compact();
    }

    // Parse JWT and return Claims
    public Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
