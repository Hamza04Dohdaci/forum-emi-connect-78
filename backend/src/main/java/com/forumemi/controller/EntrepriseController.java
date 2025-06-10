
package com.forumemi.controller;

import com.forumemi.model.Entreprise;
import com.forumemi.repository.EntrepriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/entreprises")
@CrossOrigin(origins = "*")
public class EntrepriseController {

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @GetMapping
    public List<Entreprise> getAllEntreprises() {
        return entrepriseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entreprise> getEntrepriseById(@PathVariable Long id) {
        return entrepriseRepository.findById(id)
                .map(entreprise -> ResponseEntity.ok().body(entreprise))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Entreprise> createEntreprise(@Valid @RequestBody Entreprise entreprise) {
        if (entrepriseRepository.existsByNom(entreprise.getNom())) {
            return ResponseEntity.badRequest().build();
        }
        Entreprise savedEntreprise = entrepriseRepository.save(entreprise);
        return ResponseEntity.ok(savedEntreprise);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Entreprise> updateEntreprise(@PathVariable Long id, @Valid @RequestBody Entreprise entreprise) {
        return entrepriseRepository.findById(id)
                .map(existingEntreprise -> {
                    existingEntreprise.setNom(entreprise.getNom());
                    return ResponseEntity.ok(entrepriseRepository.save(existingEntreprise));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntreprise(@PathVariable Long id) {
        return entrepriseRepository.findById(id)
                .map(entreprise -> {
                    entrepriseRepository.delete(entreprise);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
