package com.example.MongoSpring.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.MongoSpring.model.User;
import com.example.MongoSpring.repository.UserRepository;
import com.example.MongoSpring.service.GamificationService;


@RestController
@RequestMapping("api/users")
public class UserController {
    private final UserRepository userRepository;
    private final GamificationService gamificationService;

    public UserController(UserRepository userRepository, GamificationService gamificationService) {
        this.userRepository = userRepository;
        this.gamificationService = gamificationService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        Optional<User> existingEmail = userRepository.findByEmail(user.getEmail());
        Optional<User> existingUsername = userRepository.findByUsername(user.getUsername());
        
        if (existingEmail.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        if (existingUsername.isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }
        
        // Initial setup for new user
        user.setCoins(500); // Welcome Coins
        
        User savedUser = userRepository.save(user);
        // Award first badge
        gamificationService.awardBadge(savedUser.getId(), "first_trade");
        
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> userByEmail = userRepository.findByEmail(loginRequest.getEmail());
        Optional<User> userByUsername = userRepository.findByUsername(loginRequest.getUsername());
        
        User user = userByEmail.orElseGet(() -> userByUsername.orElse(null));
        
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            java.time.LocalDateTime now = java.time.LocalDateTime.now();
            java.time.LocalDateTime lastLogin = user.getLastLoginDate();
            
            if (lastLogin == null) {
                user.setCurrentStreak(1);
            } else {
                long daysBetween = java.time.temporal.ChronoUnit.DAYS.between(lastLogin.toLocalDate(), now.toLocalDate());
                if (daysBetween == 1) {
                    user.setCurrentStreak(user.getCurrentStreak() + 1);
                    // Award streak badge if they reach 3 days
                    if (user.getCurrentStreak() >= 3) {
                        gamificationService.awardBadge(user.getId(), "3-day_streak");
                    }
                } else if (daysBetween > 1) {
                    user.setCurrentStreak(1);
                }
            }
            
            user.setLastLoginDate(now);
            user = gamificationService.addCoins(user.getId(), 100); // Daily Login Reward
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().body("Invalid credentials");
    }

    @PostMapping("/{id}/deduct-coins")
    public ResponseEntity<User> deductCoins(@PathVariable String id, @RequestParam int amount) {
        try {
            User updatedUser = gamificationService.deductCoins(id, amount);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
