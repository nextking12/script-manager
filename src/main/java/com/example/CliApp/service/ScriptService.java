package com.example.CliApp.service;

import com.example.CliApp.model.Script;
import com.example.CliApp.repository.ScriptRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScriptService {

    private final ScriptRepository scriptRepository;

    // @Autowired
    public ScriptService(ScriptRepository scriptRepository) {
        this.scriptRepository = scriptRepository;

    }

    // create a new script
    public Script createScript(Script script) {
        return scriptRepository.save(script);
    }

    // get script by id
    public Optional<Script> getScriptById(Long id) {
        return scriptRepository.findById(id);
    }

    // get script by name
    public Optional<Script> getScriptByName(String name) {
        return scriptRepository.findByName(name);
    }

    
    public List<Script> getAllScripts() {
        return scriptRepository.findAll();
    }

    // update existing
    public Script updateScript(Long id, Script updatedScript) {
        return scriptRepository.findById(id)
                .map(script -> {
                    script.setName(updatedScript.getName());
                    script.setContent(updatedScript.getContent());
                    return scriptRepository.save(script);
                })
                .orElseThrow(() -> new RuntimeException("Script with Id " + id + "not found"));
    }

    // Delete a script by ID
    public void deleteScript(Long id) {
        if (scriptRepository.existsById(id)) {
            scriptRepository.deleteById(id);
        } else {
            throw new RuntimeException("Script not found with id " + id);
        }
    }

    // Delete a script by Name
    public void deleteScriptByName(String name) {
        Script script = scriptRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Script not found with name " + name));
        scriptRepository.delete(script);
    }

}
