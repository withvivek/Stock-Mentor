package com.example.MongoSpring.model;

import java.time.LocalDateTime;

public class Expense {
    private String description;
    private double amount;
    private LocalDateTime dateTime;
    private String budgetCategory;

    public Expense() {}

    public Expense(String description, double amount, String budgetCategory) {
        this.description = description;
        this.amount = amount;
        this.budgetCategory = budgetCategory;
        this.dateTime = LocalDateTime.now();
    }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(LocalDateTime dateTime) { this.dateTime = dateTime; }

    public String getBudgetCategory() { return budgetCategory; }
    public void setBudgetCategory(String budgetCategory) { this.budgetCategory = budgetCategory; }
}
