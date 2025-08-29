package com.example.script_manager_back.service;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

@Service
public class InputSanitizationService {

    public String sanitizeHtml(String input) {
        if (input == null) {
            return null;
        }
        return Jsoup.clean(input, Safelist.none());
    }

    public String sanitizeScriptName(String name) {
        if (name == null) {
            return null;
        }
        return sanitizeHtml(name.trim());
    }

    public String sanitizeLanguage(String language) {
        if (language == null) {
            return null;
        }
        return sanitizeHtml(language.trim().toLowerCase());
    }

    public String sanitizeScriptContent(String content) {
        if (content == null) {
            return null;
        }
        String cleaned = sanitizeHtml(content);
        
        if (cleaned.length() > 1000000) {
            throw new IllegalArgumentException("Script content exceeds maximum size limit");
        }
        
        return cleaned;
    }
}