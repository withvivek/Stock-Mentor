package com.example.MongoSpring.controller;

import com.example.MongoSpring.model.Budget;
import com.example.MongoSpring.model.Expense;
import com.example.MongoSpring.repository.BudgetRepository; 
import com.example.MongoSpring.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:3000")  
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private BudgetRepository budgetRepository; 

    @PostMapping("/add")
    public ResponseEntity<?> addBudget(@RequestBody Budget budget) {
        if (budget.getAllocatedAmount() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Allocated amount must be greater than zero.");
        }
        Budget savedBudget = budgetService.addBudget(budget);
        return ResponseEntity.ok(savedBudget);
    }

    @GetMapping("/user/{userId}")
    public List<Budget> getBudgetsByUserId(@PathVariable String userId) {
        return budgetService.getBudgetsByUserId(userId);
    }

    @PostMapping("/user/{userId}/addExpense/{category}")
    public ResponseEntity<?> addExpense(@PathVariable String userId, @PathVariable String category, @RequestBody Expense expense) {
        try {
            Budget updatedBudget = budgetService.addExpense(userId, category, expense);
            return ResponseEntity.ok(updatedBudget);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding expense.");
        }
    }
}
