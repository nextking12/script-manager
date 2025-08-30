package com.example.script_manager_back.service;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;

@Service
public class InputSanitizationService {

    private static final Pattern DANGEROUS_PATTERNS = Pattern.compile(
        "(?i)(script|javascript:|data:|vbscript:|onload|onerror|onclick)"
    );

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
        String trimmed = name.trim();
        
        // Remove HTML tags but preserve the text content
        String cleaned = Jsoup.clean(trimmed, Safelist.none());
        
        // Additional validation for dangerous patterns
        if (DANGEROUS_PATTERNS.matcher(cleaned).find()) {
            throw new IllegalArgumentException("Script name contains potentially dangerous content");
        }
        
        return cleaned;
    }

    public String sanitizeLanguage(String language) {
        if (language == null) {
            return null;
        }
        String trimmed = language.trim().toLowerCase();
        
        // Remove HTML tags
        String cleaned = Jsoup.clean(trimmed, Safelist.none());
        
        // Validate language format (alphanumeric, hyphens, dots, plus signs only)
        if (!cleaned.matches("^[a-z0-9_\\-\\.\\+]+$")) {
            throw new IllegalArgumentException("Language contains invalid characters");
        }
        
        return cleaned;
    }

    public String sanitizeScriptContent(String content) {
        if (content == null) {
            return null;
        }
        
        // Check size limit first
        if (content.length() > 1000000) {
            throw new IllegalArgumentException("Script content exceeds maximum size limit");
        }
        
        // For script content, we don't want to strip HTML as it might be legitimate code
        // Instead, we'll validate for dangerous patterns that could be XSS attempts
        // but preserve the actual code content
        
        // Check for obvious XSS patterns in what appears to be non-code contexts
        String lowercaseContent = content.toLowerCase();
        if (lowercaseContent.contains("<script") && 
            (lowercaseContent.contains("document.") || lowercaseContent.contains("window."))) {
            throw new IllegalArgumentException("Script content contains potentially dangerous HTML/JavaScript patterns");
        }
        
        // Check for dangerous event handlers in HTML-like content
        if (DANGEROUS_PATTERNS.matcher(content).find() && 
            (content.contains("<") || content.contains(">"))) {
            throw new IllegalArgumentException("Script content contains potentially dangerous patterns");
        }
        
        return content; // Return original content if it passes validation
    }

    public String sanitizeSearchParameter(String param) {
        if (param == null) {
            return null;
        }
        
        String trimmed = param.trim();
        
        // Remove HTML tags
        String cleaned = Jsoup.clean(trimmed, Safelist.none());
        
        // Check for dangerous patterns
        if (DANGEROUS_PATTERNS.matcher(cleaned).find()) {
            throw new IllegalArgumentException("Search parameter contains potentially dangerous content");
        }
        
        return cleaned;
    }
}