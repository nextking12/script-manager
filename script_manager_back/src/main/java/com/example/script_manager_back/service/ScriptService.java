package com.example.script_manager_back.service;

import java.util.List;
import java.util.Optional;

import com.example.script_manager_back.enitity.Script;
import com.example.script_manager_back.repository.ScriptRepository;
import org.springframework.stereotype.Service;

@Service
public class ScriptService {

    private final ScriptRepository scriptRepository;
    private final InputSanitizationService sanitizationService;

    public ScriptService(ScriptRepository scriptRepository, InputSanitizationService sanitizationService){
        this.scriptRepository = scriptRepository;
        this.sanitizationService = sanitizationService;
    }

    public List<Script>getAllScripts(){
        return scriptRepository.findAll();
    }

    public Script createScript(Script script){
        script.setName(sanitizationService.sanitizeScriptName(script.getName()));
        script.setLanguage(sanitizationService.sanitizeLanguage(script.getLanguage()));
        script.setScriptContent(sanitizationService.sanitizeScriptContent(script.getScriptContent()));
        return scriptRepository.save(script);
    }

    public Optional<Script> getScriptByName(String name){
        return scriptRepository.findScriptByName(name);
    }

    public Optional<Script> getScriptByLanguage(String language){
        return scriptRepository.findScriptByLanguage(language);
    }

    public List<Script> searchScripts(String name, String language) {
        if (name != null && !name.isEmpty() && language != null && !language.isEmpty()) {
            return scriptRepository.findScriptsByNameContainingIgnoreCaseAndLanguage(name, language);
        } else if (name != null && !name.isEmpty()) {
            return scriptRepository.findScriptsByNameContainingIgnoreCase(name);
        } else if (language != null && !language.isEmpty()) {
            return scriptRepository.findScriptsByLanguage(language);
        } else {
            return scriptRepository.findAll();
        }
    }

    public Script updateScript(String name, Script updatedScript) {
        return scriptRepository.findScriptByName(name)
                .map(script -> {
                    script.setName(sanitizationService.sanitizeScriptName(updatedScript.getName()));
                    script.setLanguage(sanitizationService.sanitizeLanguage(updatedScript.getLanguage()));
                    script.setScriptContent(sanitizationService.sanitizeScriptContent(updatedScript.getScriptContent()));
                    return scriptRepository.save(script);
                })
                .orElseThrow(() -> new RuntimeException("Script with name " + name + " not found"));
    }


    public void deleteScriptByName(String name){
        Script script = scriptRepository.findScriptByName(name)
             .orElseThrow(() -> new RuntimeException("Script not found with name " + name));
        scriptRepository.delete(script);
    }









}
