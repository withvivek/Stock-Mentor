package com.example.MongoSpring.service;

import com.example.MongoSpring.model.Stock;
import com.example.MongoSpring.repository.StockRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    private final StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @PostConstruct
    public void initTestData() {
        if (stockRepository.count() == 0) {
            Stock testStock1 = new Stock();
            testStock1.setStockSymbol("AAPL");
            testStock1.setQuantity(10);
            testStock1.setPurchasePrice(150.50);
            testStock1.setCurrentPrice(175.25);
            stockRepository.save(testStock1);

            Stock testStock2 = new Stock();
            testStock2.setStockSymbol("MSFT");
            testStock2.setQuantity(5);
            testStock2.setPurchasePrice(250.75);
            testStock2.setCurrentPrice(300.40);
            stockRepository.save(testStock2);
        }
    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public List<Stock> getStocksByUserId(String userId) {
        return stockRepository.findByUserId(userId);
    }

    public Optional<Stock> getStockBySymbol(String stockSymbol) {
        return stockRepository.findByStockSymbol(stockSymbol);
    }

    public Stock addStock(Stock stock) {
        if (stock.getStockSymbol() == null || stock.getStockSymbol().isEmpty()) {
            throw new IllegalArgumentException("Stock symbol is required");
        }
        if (stock.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        if (stock.getPurchasePrice() <= 0) {
            throw new IllegalArgumentException("Purchase price must be positive");
        }
        
        // Set current price same as purchase price initially
        stock.setCurrentPrice(stock.getPurchasePrice());
        // Set purchase date automatically
        stock.setPurchaseDate(java.time.LocalDateTime.now());
        return stockRepository.save(stock);
    }

    public Stock deleteStock(String id) {
        Optional<Stock> stock = stockRepository.findById(id);
        if (stock.isEmpty()) {
            throw new RuntimeException("Stock not found with id: " + id);
        }
        stockRepository.deleteById(id);
        return stock.get();
    }
}
