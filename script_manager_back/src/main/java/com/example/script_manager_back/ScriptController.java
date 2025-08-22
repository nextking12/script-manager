package com.example.script_manager_back;

import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scripts")
@CrossOrigin(origins = "http://localhost:3000")
public class ScriptController {

    private final ScriptService scriptService;

    @PostMapping("/create") // create new script
    public ResponseEntity<Script> createScript(@RequestBody Script script) {
        Script createdScript = scriptService.createScript(script);
        return new ResponseEntity<>(createdScript, HttpStatus.CREATED);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<Script> getScriptByName(@PathVariable String name) {
        return scriptService.getScriptByName(name)
                .map(script -> new ResponseEntity<>(script, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/search/{language}")
    public ResponseEntity<Script> getScriptByLanguage(@PathVariable String language) {
        return scriptService.getScriptByLanguage(language)
                .map(script -> new ResponseEntity<>(script, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
