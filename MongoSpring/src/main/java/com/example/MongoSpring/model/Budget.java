package com.example.MongoSpring.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "budgets")
public class Budget {
    @Id
    private String id;
    private String userId;
    private String category;
    private double allocatedAmount;
    private double remainingAmount;
    private List<Expense> expenses = new ArrayList<>();

    public Budget() {}

    public Budget(String userId, String category, double allocatedAmount) {
        this.userId = userId;
        this.category = category;
        this.allocatedAmount = allocatedAmount;
        this.remainingAmount = allocatedAmount;
        this.expenses = new ArrayList<>();
    }

    public void addExpense(Expense expense) {
        if (expense.getAmount() <= this.remainingAmount) {
            this.expenses.add(expense);
            this.remainingAmount -= expense.getAmount();
        } else {
            throw new IllegalArgumentException("Insufficient budget!");
        }
    }

    public void setAllocatedAmount(double allocatedAmount) {
        if (this.expenses.isEmpty()) {
            this.remainingAmount = allocatedAmount; 
        } else {
            double spentAmount = this.allocatedAmount - this.remainingAmount;
            this.remainingAmount = allocatedAmount - spentAmount; 
        }
        this.allocatedAmount = allocatedAmount;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getAllocatedAmount() { return allocatedAmount; }

    public double getRemainingAmount() { return remainingAmount; }

    public List<Expense> getExpenses() { return expenses; }
    public void setExpenses(List<Expense> expenses) { this.expenses = expenses; }
}
