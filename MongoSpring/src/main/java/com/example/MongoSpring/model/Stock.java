package com.example.MongoSpring.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "stocks") 
public class Stock {
    
    @Id
    private String id;
    private String userId;
    private String stockSymbol;
    private int quantity;
    private double purchasePrice;
    private double currentPrice;
    private java.time.LocalDateTime purchaseDate;

    public Stock() {}

    public Stock(String userId, String stockSymbol, int quantity, double purchasePrice, double currentPrice) {
        this.userId = userId;
        this.stockSymbol = stockSymbol;
        this.quantity = quantity;
        this.purchasePrice = purchasePrice;
        this.currentPrice = currentPrice;
    }

    public double getTotalValue() {
        return quantity * currentPrice;
    }

    public double getGainLoss() {
        return (currentPrice - purchasePrice) * quantity;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getStockSymbol() { return stockSymbol; }
    public void setStockSymbol(String stockSymbol) { this.stockSymbol = stockSymbol; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPurchasePrice() { return purchasePrice; }
    public void setPurchasePrice(double purchasePrice) { this.purchasePrice = purchasePrice; }

    public double getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(double currentPrice) { this.currentPrice = currentPrice; }

    public java.time.LocalDateTime getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(java.time.LocalDateTime purchaseDate) { this.purchaseDate = purchaseDate; }
}
