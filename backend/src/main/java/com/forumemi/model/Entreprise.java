
package com.forumemi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "entreprises")
public class Entreprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom de l'entreprise est obligatoire")
    @Size(max = 200)
    private String nom;

    @OneToMany(mappedBy = "entreprise", cascade = CascadeType.ALL)
    private List<Stand> stands;

    @OneToMany(mappedBy = "entreprise", cascade = CascadeType.ALL)
    private List<Intervenant> intervenants;

    public Entreprise() {}

    public Entreprise(String nom) {
        this.nom = nom;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public List<Stand> getStands() { return stands; }
    public void setStands(List<Stand> stands) { this.stands = stands; }
    
    public List<Intervenant> getIntervenants() { return intervenants; }
    public void setIntervenants(List<Intervenant> intervenants) { this.intervenants = intervenants; }
}
