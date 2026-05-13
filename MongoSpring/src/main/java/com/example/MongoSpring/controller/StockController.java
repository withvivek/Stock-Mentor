package com.example.MongoSpring.controller;

import com.example.MongoSpring.model.Stock;
import com.example.MongoSpring.service.GamificationService;
import com.example.MongoSpring.service.StockService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import com.example.MongoSpring.service.StockDataService;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {

    private final StockService stockService;
    private final GamificationService gamificationService;
    private final StockDataService stockDataService;

    public StockController(StockService stockService, GamificationService gamificationService, StockDataService stockDataService) {
        this.stockService = stockService;
        this.gamificationService = gamificationService;
        this.stockDataService = stockDataService;
    }

    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        return ResponseEntity.ok(stockService.getAllStocks());
    }

    @GetMapping("/{symbol}")
    public ResponseEntity<Stock> getStockBySymbol(@PathVariable String symbol) {
        return stockService.getStockBySymbol(symbol)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/market-data/{exchange}")
    public List<Map<String, Object>> getMarketData(@PathVariable String exchange) {
        return stockDataService.getMarketData(exchange);
    }

    @GetMapping("/live/{symbol}")
    public Map<String, Object> getLiveStock(@PathVariable String symbol) {
        return stockDataService.getLiveStock(symbol);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Stock>> getStocksByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(stockService.getStocksByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
        try {
            Stock savedStock = stockService.addStock(stock);
            // Award 1000 coins for adding a stock
            if (savedStock.getUserId() != null) {
                gamificationService.addCoins(savedStock.getUserId(), 1000);
            }
            return ResponseEntity.ok(savedStock);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable String id) {
        try {
            Stock soldStock = stockService.deleteStock(id);
            // Award 500 coins for selling
            if (soldStock.getUserId() != null) {
                gamificationService.addCoins(soldStock.getUserId(), 500);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<List<Stock>> refreshPrices() {
        return ResponseEntity.ok(stockService.getAllStocks());
    }
}
