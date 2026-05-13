package com.example.MongoSpring.repository;

import com.example.MongoSpring.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    
    @Query("{ 'enabled': true }")
    List<User> findAllActiveUsers();
    
    @Query("{ 'roles': ?0 }")
    List<User> findByRole(String role);
    
    @Query("{ 'profile.riskTolerance': ?0 }")
    List<User> findByRiskTolerance(String riskTolerance);
    
    @Query("{ $or: [ { 'verificationToken': ?0 }, { 'resetToken': ?0 } ] }")
    Optional<User> findByToken(String token);
}