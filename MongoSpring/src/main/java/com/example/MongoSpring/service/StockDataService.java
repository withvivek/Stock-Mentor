package com.example.MongoSpring.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class StockDataService {

    @Value("${alpha.vantage.api.key}")
    private String apiKey;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    // In-memory cache fallback for both exchanges
    private List<Map<String, Object>> cachedNseData = new ArrayList<>();
    private List<Map<String, Object>> cachedBseData = new ArrayList<>();

    public StockDataService() {
        cachedNseData = new ArrayList<>();
        cachedBseData = new ArrayList<>();
        addInitialStocks();
    }

    private void addInitialStocks() {
        // NSE Specific Stocks
        String[][] nseInitial = {
            {"RELIANCE", "2540.00", "12.5", "0.5%", "GAINER"},
            {"TCS", "3420.00", "-15.2", "-0.4%", "LOSER"},
            {"INFY", "1580.00", "25.0", "1.6%", "GAINER"},
            {"SBIN", "580.00", "10.0", "1.7%", "GAINER"},
            {"HDFCBANK", "1650.00", "5.0", "0.3%", "GAINER"},
            {"ADANIENT", "2450.00", "-45.0", "-1.8%", "LOSER"}
        };

        // BSE Specific Stocks (to look different)
        String[][] bseInitial = {
            {"TATASTEEL", "115.00", "2.5", "2.2%", "GAINER"},
            {"ICICIBANK", "920.00", "-8.0", "-0.8%", "LOSER"},
            {"ITC", "445.00", "4.0", "0.9%", "GAINER"},
            {"WIPRO", "405.00", "-3.5", "-0.8%", "LOSER"},
            {"BHARTIARTL", "880.00", "15.0", "1.7%", "GAINER"},
            {"MARUTI", "9500.00", "-120.0", "-1.2%", "LOSER"}
        };

        for (String[] s : nseInitial) cachedNseData.add(createStockMap(s));
        for (String[] s : bseInitial) cachedBseData.add(createStockMap(s));
    }

    private Map<String, Object> createStockMap(String[] s) {
        Map<String, Object> item = new HashMap<>();
        item.put("name", s[0]);
        item.put("price", s[1]);
        item.put("change", s[2]);
        item.put("changePercent", s[3]);
        item.put("type", s[4]);
        return item;
    }

    @Cacheable(value = "marketData", key = "#exchange")
    public List<Map<String, Object>> getMarketData(String exchange) {
        try {
            if (exchange.equalsIgnoreCase("NSE")) {
                List<Map<String, Object>> data = getNseData();
                return (data == null || data.isEmpty()) ? cachedNseData : data;
            } else {
                List<Map<String, Object>> data = getBseData();
                return (data == null || data.isEmpty()) ? cachedBseData : data;
            }
        } catch (Exception e) {
            return exchange.equalsIgnoreCase("NSE") ? cachedNseData : cachedBseData;
        }
    }

    private List<Map<String, Object>> getNseData() {
        if (apiKey == null || apiKey.isEmpty() || apiKey.equals("YOUR_API_KEY")) {
            System.err.println("ALARM: Alpha Vantage API Key is NOT set in application.properties!");
            return new ArrayList<>();
        }

        String url = String.format(
            "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=%s",
            apiKey);
        
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.getForObject(url, HashMap.class);
            
            if (response == null) return new ArrayList<>();

            if (response.containsKey("Note")) {
                System.out.println("API LIMIT HIT: " + response.get("Note"));
                return new ArrayList<>();
            }

            if (response.containsKey("Information")) {
                System.out.println("API INFO: " + response.get("Information"));
                return new ArrayList<>();
            }

            if (response.containsKey("Error Message")) {
                System.err.println("API ERROR: " + response.get("Error Message"));
                return new ArrayList<>();
            }
            
            return processNseData(response);
        } catch (Exception e) {
            System.err.println("CONNECTION ERROR: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    // New method to fetch a specific stock live
    public Map<String, Object> getLiveStock(String symbol) {
        // 1. Try Live API first
        Map<String, Object> data = fetchFromAlphaVantage(symbol);
        
        // Auto-append .BSE if needed for API
        if (data == null && !symbol.contains(".")) {
            data = fetchFromAlphaVantage(symbol + ".BSE");
        }

        // 2. If API fails (limit or not found), search in our LOCAL CACHE
        if (data == null) {
            System.out.println("API limit or not found for " + symbol + ". Searching in local cache...");
            String cleanSymbol = symbol.toUpperCase().split("\\.")[0];
            
            // Search in both NSE and BSE cache
            for (Map<String, Object> s : cachedNseData) {
                if (s.get("name").toString().equalsIgnoreCase(cleanSymbol)) return s;
            }
            for (Map<String, Object> s : cachedBseData) {
                if (s.get("name").toString().equalsIgnoreCase(cleanSymbol)) return s;
            }
        }
        
        return data;
    }

    private Map<String, Object> fetchFromAlphaVantage(String symbol) {
        String url = String.format(
            "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s",
            symbol, apiKey);
        
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.getForObject(url, HashMap.class);
            if (response != null && response.containsKey("Global Quote")) {
                Map<String, String> quote = (Map<String, String>) response.get("Global Quote");
                if (quote == null || quote.isEmpty() || !quote.containsKey("05. price")) {
                    return null;
                }

                Map<String, Object> result = new HashMap<>();
                result.put("name", quote.get("01. symbol"));
                result.put("price", quote.get("05. price"));
                result.put("change", quote.get("09. change"));
                result.put("changePercent", quote.get("10. change percent"));
                
                String changeStr = quote.get("09. change");
                double change = (changeStr != null && !changeStr.equals("null")) ? Double.parseDouble(changeStr) : 0.0;
                result.put("type", change >= 0 ? "GAINER" : "LOSER");
                
                return result;
            }
        } catch (Exception e) {
            System.err.println("Error for " + symbol + ": " + e.getMessage());
        }
        return null;
    }

    private List<Map<String, Object>> getBseData() {
        String url = String.format(
            "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^BSESN&apikey=%s",
            apiKey);
        
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.getForObject(url, HashMap.class);
            return processBseData(response);
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    private List<Map<String, Object>> processNseData(Map<String, Object> response) {
        List<Map<String, Object>> result = new ArrayList<>();
       
        @SuppressWarnings("unchecked")
        List<Map<String, String>> topGainers = (List<Map<String, String>>) response.get("top_gainers");
        if (topGainers != null) {
            topGainers.forEach(stock -> {
                Map<String, Object> item = new HashMap<>();
                item.put("name", stock.get("ticker"));
                item.put("price", stock.get("price"));
                item.put("change", stock.get("change_amount"));
                item.put("changePercent", stock.get("change_percentage"));
                item.put("type", "GAINER");
                result.add(item);
            });
        }
        
        @SuppressWarnings("unchecked")
        List<Map<String, String>> topLosers = (List<Map<String, String>>) response.get("top_losers");
        if (topLosers != null) {
            topLosers.forEach(stock -> {
                Map<String, Object> item = new HashMap<>();
                item.put("name", stock.get("ticker"));
                item.put("price", stock.get("price"));
                item.put("change", stock.get("change_amount"));
                item.put("changePercent", stock.get("change_percentage"));
                item.put("type", "LOSER");
                result.add(item);
            });
        }
        
        return result;
    }

    private List<Map<String, Object>> processBseData(Map<String, Object> response) {
        List<Map<String, Object>> result = new ArrayList<>();
        
        if (response != null && response.containsKey("Time Series (Daily)")) {
            @SuppressWarnings("unchecked")
            Map<String, Map<String, String>> timeSeries = (Map<String, Map<String, String>>) response.get("Time Series (Daily)");
            if (timeSeries != null && !timeSeries.isEmpty()) {
                String latestDate = timeSeries.keySet().iterator().next();
                Map<String, String> latestData = timeSeries.get(latestDate);
                
                Map<String, Object> item = new HashMap<>();
                item.put("name", "SENSEX");
                item.put("price", latestData.get("4. close"));
                item.put("change", 
                    Double.parseDouble(latestData.get("4. close")) - 
                    Double.parseDouble(latestData.get("1. open")));
                item.put("changePercent", 
                    ((Double.parseDouble(latestData.get("4. close")) - 
                      Double.parseDouble(latestData.get("1. open"))) / 
                     Double.parseDouble(latestData.get("1. open"))) * 100);
                item.put("type", "INDEX");
                result.add(item);
            }
        }
        addSampleBseStocks(result);
        
        return result;
    }

    private void addSampleBseStocks(List<Map<String, Object>> result) {
        String[][] sampleStocks = {
            {"RELIANCE", "2500.50", "25.75", "1.03"},
            {"TATASTEEL", "120.75", "-1.25", "-1.02"},
            {"HDFCBANK", "1500.25", "15.50", "1.04"},
            {"ICICIBANK", "800.60", "-5.40", "-0.67"},
            {"INFY", "1600.00", "20.00", "1.25"}
        };
        
        for (String[] stock : sampleStocks) {
            Map<String, Object> item = new HashMap<>();
            item.put("name", stock[0]);
            item.put("price", stock[1]);
            item.put("change", stock[2]);
            item.put("changePercent", stock[3]);
            item.put("type", Double.parseDouble(stock[2]) >= 0 ? "GAINER" : "LOSER");
            result.add(item);
        }
    }
}

//