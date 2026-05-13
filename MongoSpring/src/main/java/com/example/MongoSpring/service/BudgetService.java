package com.example.MongoSpring.service;

import com.example.MongoSpring.model.Budget;
import com.example.MongoSpring.model.Expense;
import com.example.MongoSpring.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    public Budget addBudget(Budget budget) {
        if (budget.getAllocatedAmount() <= 0) {
            throw new IllegalArgumentException("Allocated amount must be greater than zero.");
        }
        // Check if category already exists for this user
        Budget existing = budgetRepository.findByUserIdAndCategory(budget.getUserId(), budget.getCategory());
        if (existing != null) {
            existing.setAllocatedAmount(budget.getAllocatedAmount());
            return budgetRepository.save(existing);
        }
        return budgetRepository.save(budget);
    }

    public List<Budget> getBudgetsByUserId(String userId) {
        return budgetRepository.findByUserId(userId);
    }

    public Budget addExpense(String userId, String category, Expense expense) {
        Budget budget = budgetRepository.findByUserIdAndCategory(userId, category);
        if (budget == null) {
            throw new IllegalArgumentException("Budget category not found for this user.");
        }

        budget.addExpense(expense);
        return budgetRepository.save(budget);
    }

    public double getRemainingAmount(Budget budget) {
        double totalExpenses = budget.getExpenses().stream().mapToDouble(Expense::getAmount).sum();
        return budget.getAllocatedAmount() - totalExpenses;
    }
}

