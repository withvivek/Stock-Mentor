package com.example.MongoSpring.repository;

import com.example.MongoSpring.model.Budget;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends MongoRepository<Budget, String> {
    List<Budget> findByUserId(String userId);
    Budget findByUserIdAndCategory(String userId, String category);
}
