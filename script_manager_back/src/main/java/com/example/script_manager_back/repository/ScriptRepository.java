package com.example.script_manager_back;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScriptRepository extends JpaRepository<Script, Long> {
        Optional<Script> findScriptByName (String name);
        List<Script> findScriptsByNameContainingIgnoreCase(String name);
        
        Optional<Script> findScriptByLanguage (String language);
        List<Script> findScriptsByLanguage(String language);
        
        List<Script> findScriptsByNameContainingIgnoreCaseAndLanguage(String name, String language);
}
