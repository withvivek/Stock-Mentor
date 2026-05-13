package com.example.MongoSpring.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class AiChatService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getAiResponse(String userPrompt) {
        try {
            // Comprehensive System Prompt to make the AI aware of the platform
            String systemInstructions = "You are 'Stock Mentor AI', the official guide for the 'Stock Mentor' platform. " +
                    "Your job is to help users navigate the website and answer stock market queries. " +
                    "KNOWLEDGE ABOUT STOCK MENTOR PLATFORM: " +
                    "1. MARKET: Users can view real-time stock prices and perform Virtual Trading (Buy/Sell) here. " +
                    "2. LEARN: A structured Learning Management System with 6 Modules covering Basics, Technical/Fundamental analysis, and a Practical Guide on how to buy/sell and avoid scams. " +
                    "3. BUDGET: A tool to manage monthly budgets and track expenses to find investable surplus. " +
                    "4. GAMIFICATION: Users earn Coins and Experience (XP) by learning and managing finances. They can level up their profile. " +
                    "5. SETTINGS: Users can link Bank accounts, switch between Dark/Light themes, and manage their profile. " +
                    "INSTRUCTIONS: Be helpful, concise, and always encourage users to check the 'Learn' module for deep knowledge. " +
                    "If asked about platform features, explain them clearly. Use Indian context.";

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "llama-3.1-8b-instant"); // Fast and stable current model
            
            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", systemInstructions));
            messages.add(Map.of("role", "user", "content", userPrompt));
            
            requestBody.put("messages", messages);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                List choices = (List) response.getBody().get("choices");
                Map firstChoice = (Map) choices.get(0);
                Map message = (Map) firstChoice.get("message");
                return (String) message.get("content");
            }

            return "I'm having trouble connecting to my brain right now. Please try again later.";

        } catch (Exception e) {
            e.printStackTrace();
            return "Sorry, I encountered an error: " + e.getMessage();
        }
    }
}
