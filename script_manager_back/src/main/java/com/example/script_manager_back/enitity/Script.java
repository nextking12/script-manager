package com.example.script_manager_back;

import jakarta.persistence.*;

@Entity 
@Table(name = "scripts")    
public class Script {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(nullable = false)
    private String language;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
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
