
package com.forumemi.controller;

import com.forumemi.model.Tache;
import com.forumemi.repository.TacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/taches")
@CrossOrigin(origins = "*")
public class TacheController {

    @Autowired
    private TacheRepository tacheRepository;

    @GetMapping
    public List<Tache> getAllTaches() {
        return tacheRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tache> getTacheById(@PathVariable Long id) {
        return tacheRepository.findById(id)
                .map(tache -> ResponseEntity.ok().body(tache))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tache> createTache(@Valid @RequestBody Tache tache) {
        Tache savedTache = tacheRepository.save(tache);
        return ResponseEntity.ok(savedTache);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tache> updateTache(@PathVariable Long id, @Valid @RequestBody Tache tache) {
        return tacheRepository.findById(id)
                .map(existingTache -> {
                    existingTache.setDescription(tache.getDescription());
                    existingTache.setStatut(tache.getStatut());
                    existingTache.setDateLimite(tache.getDateLimite());
                    existingTache.setPriorite(tache.getPriorite());
                    return ResponseEntity.ok(tacheRepository.save(existingTache));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTache(@PathVariable Long id) {
        return tacheRepository.findById(id)
                .map(tache -> {
                    tacheRepository.delete(tache);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
