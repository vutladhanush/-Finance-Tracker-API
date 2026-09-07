package com.finance.controller;

import com.finance.entity.User;
import com.finance.repository.UserRepository;
import com.finance.security.JwtService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "https://finance-tracker-api-mauve.vercel.app/")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            UserRepository userRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    // =========================
    // SIGNUP
    // =========================

    @PostMapping("/signup")
    public ResponseEntity<?> signup(
            @RequestBody Map<String, String> signupRequest) {

        String name = signupRequest.get("name");
        String email = signupRequest.get("email");
        String password = signupRequest.get("password");

        // Check required fields
        if (name == null ||
                email == null ||
                password == null) {

            return ResponseEntity
                    .badRequest()
                    .body("Name, email and password are required");
        }

        // Check whether email already exists
        if (userRepository.findByEmail(email).isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }

        // Create user
        User user = new User();

        user.setName(name);
        user.setEmail(email);

        // IMPORTANT:
        // Store encrypted password
        user.setPassword(
                passwordEncoder.encode(password)
        );

        userRepository.save(user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("User registered successfully");
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> loginRequest) {

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        if (email == null ||
                password == null) {

            return ResponseEntity
                    .badRequest()
                    .body("Email and password are required");
        }

        // Find user
        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if (user == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        // Verify password
        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }

        // Generate JWT
        String token =
                jwtService.generateToken(email);

        // Response
        Map<String, Object> response =
                new HashMap<>();

        response.put("message", "Login successful");
        response.put("token", token);
        response.put("userId", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());

        return ResponseEntity.ok(response);
    }
}
