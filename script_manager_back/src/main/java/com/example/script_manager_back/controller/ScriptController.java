package com.example.script_manager_back.controller;

import java.util.List;

import com.example.script_manager_back.enitity.Script;
import com.example.script_manager_back.service.ScriptService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@RestController
@RequestMapping("/api/scripts")
@Validated
public class ScriptController {

    private final ScriptService scriptService;

    public ScriptController(ScriptService scriptService){
        this.scriptService = scriptService;
    }

    @PostMapping // create new script
    public ResponseEntity<Script> createScript(@Valid @RequestBody Script script) {
        Script createdScript = scriptService.createScript(script);
        return new ResponseEntity<>(createdScript, HttpStatus.CREATED);
    }

    @GetMapping("/search/name/{name}") // search by name
    public ResponseEntity<Script> getScriptByName(@PathVariable @NotBlank @Size(max = 255) String name) {
        return scriptService.getScriptByName(name)
                .map(script -> new ResponseEntity<>(script, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/search") // search by name and/or language
    public ResponseEntity<List<Script>> searchScripts(
            @RequestParam(required = false) @Size(max = 255) String name,
            @RequestParam(required = false) @Size(max = 100) String language) {
        List<Script> results = scriptService.searchScripts(name, language);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @GetMapping("/language") // search by language via query parameter
    public ResponseEntity<Script> getScriptByLanguageQuery(@RequestParam @NotBlank @Size(max = 100) String language) {
        return scriptService.getScriptByLanguage(language)
                .map(script -> new ResponseEntity<>(script, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/search/language/{language}") // search by language
    public ResponseEntity<Script> getScriptByLanguage(@PathVariable @NotBlank @Size(max = 100) String language) {
        return scriptService.getScriptByLanguage(language)
                .map(script -> new ResponseEntity<>(script, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping // get all scripts
    public ResponseEntity<List<Script>> getAllScripts() {
        List<Script> scripts = scriptService.getAllScripts();
        return new ResponseEntity<>(scripts, HttpStatus.OK);
    }

    @PutMapping("/update/{name}")
    public ResponseEntity<Script> updateScript(@PathVariable @NotBlank @Size(max = 255) String name, @Valid @RequestBody Script script) {
        try {
            Script updatedScript = scriptService.updateScript(name, script);
            return new ResponseEntity<>(updatedScript, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/byName/{name}")
    public ResponseEntity<Void> deleteScriptByName(@PathVariable @NotBlank @Size(max = 255) String name) {
        try {
            scriptService.deleteScriptByName(name);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
