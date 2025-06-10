
package com.forumemi.controller;

import com.forumemi.dto.LoginRequest;
import com.forumemi.dto.LoginResponse;
import com.forumemi.model.Utilisateur;
import com.forumemi.repository.UtilisateurRepository;
import com.forumemi.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (utilisateur != null && utilisateur.getMotDePasse().equals(loginRequest.getMotDePasse())) {
            String token = jwtUtil.generateToken(utilisateur.getEmail(), utilisateur.getRole().toString());
            
            LoginResponse response = new LoginResponse(
                token,
                utilisateur.getNom(),
                utilisateur.getPrenom(),
                utilisateur.getEmail(),
                utilisateur.getRole().toString()
            );
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.badRequest().body("Email ou mot de passe incorrect");
    }
}
