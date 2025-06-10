
package com.forumemi.controller;

import com.forumemi.model.Stand;
import com.forumemi.repository.StandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/stands")
@CrossOrigin(origins = "*")
public class StandController {

    @Autowired
    private StandRepository standRepository;

    @GetMapping
    public List<Stand> getAllStands() {
        return standRepository.findAll();
    }

    @GetMapping("/zone/{zone}")
    public List<Stand> getStandsByZone(@PathVariable String zone) {
        return standRepository.findByZone(zone);
    }

    @PostMapping
    public ResponseEntity<Stand> createStand(@Valid @RequestBody Stand stand) {
        if (standRepository.existsByNumero(stand.getNumero())) {
            return ResponseEntity.badRequest().build();
        }
        Stand savedStand = standRepository.save(stand);
        return ResponseEntity.ok(savedStand);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stand> updateStand(@PathVariable Long id, @Valid @RequestBody Stand stand) {
        return standRepository.findById(id)
                .map(existingStand -> {
                    existingStand.setStatut(stand.getStatut());
                    existingStand.setEntreprise(stand.getEntreprise());
                    return ResponseEntity.ok(standRepository.save(existingStand));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStand(@PathVariable Long id) {
        return standRepository.findById(id)
                .map(stand -> {
                    standRepository.delete(stand);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
