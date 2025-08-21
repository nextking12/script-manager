package com.example.script_manager_back;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScriptRepository extends JpaRepository<Script, Long> {
        Optional<Script> findScriptByName (String name);
        
        Optional<Script> findScriptByLanguage (String language);
}
