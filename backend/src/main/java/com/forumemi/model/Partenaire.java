
package com.forumemi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "partenaires")
public class Partenaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom du partenaire est obligatoire")
    @Size(max = 200)
    private String nom;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contrat_id")
    private Contrat contrat;

    @ManyToOne
    @JoinColumn(name = "evenement_id")
    private Evenement evenement;

    public Partenaire() {}

    public Partenaire(String nom, Contrat contrat) {
        this.nom = nom;
        this.contrat = contrat;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public Contrat getContrat() { return contrat; }
    public void setContrat(Contrat contrat) { this.contrat = contrat; }
    
    public Evenement getEvenement() { return evenement; }
    public void setEvenement(Evenement evenement) { this.evenement = evenement; }
}
