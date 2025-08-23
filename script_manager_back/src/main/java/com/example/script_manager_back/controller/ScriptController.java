package com.example.script_manager_back;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scripts")
@CrossOrigin(origins = "http://localhost:3000")
public class ScriptController {

    private final ScriptService scriptService;

    public ScriptController(ScriptService scriptService){
        this.scriptService = scriptService;
    }

    @PostMapping // create new script
    public ResponseEntity<Script> createScript(@RequestBody Script script) {
        Script createdScript = scriptService.createScript(script);
        return new ResponseEntity<>(createdScript, HttpStatus.CREATED);
    }

    @GetMapping("/search/name/{name}") // search by name
    public ResponseEntity<Script> getScriptByName(@PathVariable String name) {
        return scriptService.getScriptByName(name)
                .map(script -> new ResponseEntity<>(script, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/search") // search by name via query parameter
    public ResponseEntity<Script> getScriptByNameQuery(@RequestParam String name) {
        return scriptService.getScriptByName(name)
                .map(script -> new ResponseEntity<>(script, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/language") // search by language via query parameter
    public ResponseEntity<Script> getScriptByLanguageQuery(@RequestParam String language) {
        return scriptService.getScriptByLanguage(language)
                .map(script -> new ResponseEntity<>(script, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/search/language/{language}") // search by language
    public ResponseEntity<Script> getScriptByLanguage(@PathVariable String language) {
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
    public ResponseEntity<Script> updateScript(@PathVariable String name, @RequestBody Script script) {
        try {

            Script updatedScript = scriptService.updateScript(name, script);
            return new ResponseEntity<>(updatedScript, HttpStatus.OK);
        } catch (RuntimeException e) {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/byName/{name}")
    public ResponseEntity<Void> deleteScriptByName(@PathVariable String name) {
        try {
            scriptService.deleteScriptByName(name);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
