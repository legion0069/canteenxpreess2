package com.canteenxpress.controller;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.canteenxpress.model.User;
import com.canteenxpress.repository.UserRepository;
import com.canteenxpress.security.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Validate email domain
        if (!user.getEmail().toLowerCase().endsWith("@mallareddyuniversity.ac.in")) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Please use your university email address"));
        }

        // Check if user exists
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Email already registered"));
        }

        // Initialize user fields
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(Instant.now().toString());
        user.setOrderHistory(new ArrayList<>());
        
        // Save user
        User savedUser = userRepository.save(user);

        // Generate JWT
        String token = jwtService.generateToken(savedUser);

        // Create response
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
            "id", savedUser.getId(),
            "email", savedUser.getEmail(),
            "role", savedUser.getRole()
        ));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        return userRepository.findByEmail(credentials.get("email"))
            .filter(user -> passwordEncoder.matches(credentials.get("password"), user.getPassword()))
            .map(user -> {
                String token = jwtService.generateToken(user);
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("user", Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole()
                ));
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials")));
    }
}