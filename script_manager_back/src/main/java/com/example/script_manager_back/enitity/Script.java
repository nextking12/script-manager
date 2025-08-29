package com.example.script_manager_back.enitity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "scripts")    
public class Script {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    @NotBlank(message = "Script name is required")
    @Size(min = 1, max = 255, message = "Script name must be between 1 and 255 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_\\-\\.\\s]+$", message = "Script name contains invalid characters")
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "Language is required")
    @Size(max = 100, message = "Language must be at most 100 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_\\-\\+\\.]+$", message = "Language contains invalid characters")
    private String language;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotBlank(message = "Script content is required")
    @Size(max = 1000000, message = "Script content must be at most 1MB")
    private String scriptContent;

    public Script() {
    }

    public Script(String name, String language, String scriptContent) {
        this.name = name;
        this.language = language;
        this.scriptContent = scriptContent;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getScriptContent() {
        return scriptContent;
    }

    public void setScriptContent(String scriptContent) {
        this.scriptContent = scriptContent;
    }

    @Override
    public String toString() {
        return "Script{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", language='" + language + '\'' +
                ", scriptContent='" + scriptContent + '\'' +
                '}';
    }


}
