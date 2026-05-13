package com.example.MongoSpring.service;

import com.example.MongoSpring.config.AlphaVantageConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@Service
public class StockPriceService {

    private final RestTemplate restTemplate;
    public StockPriceService(RestTemplate restTemplate, AlphaVantageConfig config) {
        this.restTemplate = restTemplate;
    }

    @Cacheable(value = "stockPrices", key = "#symbol")
    public double getCurrentPrice(String symbol) {
        @SuppressWarnings("deprecation")
        String url = UriComponentsBuilder.fromHttpUrl("https://www.alphavantage.co/query")
                .queryParam("function", "GLOBAL_QUOTE")
                .queryParam("symbol", symbol)
                .queryParam("apikey", AlphaVantageConfig.getApiKey())
                .toUriString();

        @SuppressWarnings("unchecked")
        Map<String, Object> response = restTemplate.getForObject(url, HashMap.class);
        @SuppressWarnings({ "null", "unchecked" })
        Map<String, String> quote = (Map<String, String>) response.get("Global Quote");
        
        if (quote == null || quote.isEmpty()) {
            throw new RuntimeException("Unable to fetch price for symbol: " + symbol);
        }

        return Double.parseDouble(quote.get("05. price"));
    }
}