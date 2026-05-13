package com.example.MongoSpring.service;

import com.example.MongoSpring.model.User;
import com.example.MongoSpring.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GamificationService {

    private final UserRepository userRepository;

    public GamificationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Adds Coins to a user's wallet.
     */
    public User addCoins(String userId, int coinsToAdd) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setCoins(user.getCoins() + coinsToAdd);
        return userRepository.save(user);
    }

    /**
     * Deducts Coins from a user's wallet for discounts.
     */
    public User deductCoins(String userId, int coinsToDeduct) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        int currentCoins = user.getCoins();
        if (currentCoins >= coinsToDeduct) {
            user.setCoins(currentCoins - coinsToDeduct);
        } else {
            user.setCoins(0);
        }
        return userRepository.save(user);
    }

    public User awardBadge(String userId, String badgeId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<String> badges = user.getEarnedBadges();
        if (!badges.contains(badgeId)) {
            badges.add(badgeId);
            user.setEarnedBadges(badges);
        }
        return userRepository.save(user);
    }
}
