package com.example.script_manager_back;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ScriptService {

    private final ScriptRepository scriptRepository;

    public ScriptService(ScriptRepository scriptRepository){
        this.scriptRepository = scriptRepository;
    }

    public List<Script>getAllScripts(){
        return scriptRepository.findAll();
    }

    public void addScript(Script script){
        scriptRepository.save(script);
    }

    public Script getScriptByName(String name){
        return scriptRepository.findScriptByName(name)
         .orElseThrow(() -> new IllegalStateException(name + "not found"));
    }

    public Script getScriptByLanguage(String language){
        return scriptRepository.findScriptByLanguage(language)
            .orElseThrow(() -> new IllegalStateException(language + "not found"));
    }


    public void deleteScriptByName(String name){
        Script script = scriptRepository.findScriptByName(name)
             .orElseThrow(() -> new RuntimeException("Script not found with name " + name));
        scriptRepository.delete(script);
    }









}
