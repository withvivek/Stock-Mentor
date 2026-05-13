package com.example.MongoSpring.controller;

import com.example.MongoSpring.service.AiChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AiChatController {

    @Autowired
    private AiChatService aiChatService;

    @PostMapping("/chat")
    public Map<String, String> chatWithAi(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        String aiResponse = aiChatService.getAiResponse(userMessage);
        return Map.of("response", aiResponse);
    }
}
