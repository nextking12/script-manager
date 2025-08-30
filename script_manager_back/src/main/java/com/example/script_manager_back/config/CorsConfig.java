package com.example.script_manager_back.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${app.cors.allowed-origins:http://localhost:3000}")
    private String[] allowedOrigins;

    @Value("${app.cors.allowed-methods:GET,POST,PUT,DELETE,OPTIONS}")
    private String[] allowedMethods;

    @Value("${app.cors.allowed-headers:Content-Type,Authorization,X-Requested-With}")
    private String[] allowedHeaders;

    @Value("${app.cors.allow-credentials:false}")
    private boolean allowCredentials;

    @Value("${app.cors.max-age:3600}")
    private long maxAge;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Set allowed origins from environment
        List<String> origins = Arrays.asList(allowedOrigins);
        configuration.setAllowedOriginPatterns(origins);
        
        // Set allowed methods
        configuration.setAllowedMethods(Arrays.asList(allowedMethods));
        
        // Set allowed headers
        configuration.setAllowedHeaders(Arrays.asList(allowedHeaders));
        
        // Set credentials
        configuration.setAllowCredentials(allowCredentials);
        
        // Set max age for preflight cache
        configuration.setMaxAge(maxAge);
        
        // Expose common headers that might be needed by frontend
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Content-Type");
        configuration.addExposedHeader("X-Total-Count");
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        
        return source;
    }
}