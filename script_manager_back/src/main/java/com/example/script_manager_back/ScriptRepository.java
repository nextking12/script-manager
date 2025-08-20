package com.example.script_manager_back;

import java.util.Optional;

import main.java.com.example.script_manager_back.Script;

public interface ScriptRepository extends JpaRepository<Script, Long> {
        Optional<Script> findByName (String name);
}
