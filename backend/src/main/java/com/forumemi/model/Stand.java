
package com.forumemi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "stands")
public class Stand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Le numéro de stand est obligatoire")
    @Column(unique = true)
    private Integer numero;

    @Enumerated(EnumType.STRING)
    private StatutStand statut = StatutStand.LIBRE;

    @Enumerated(EnumType.STRING)
    private TailleStand taille = TailleStand.MEDIUM;

    @Column(name = "zone")
    private String zone;

    @OneToOne
    @JoinColumn(name = "entreprise_id")
    private Entreprise entreprise;

    public Stand() {}

    public Stand(Integer numero, String zone, TailleStand taille) {
        this.numero = numero;
        this.zone = zone;
        this.taille = taille;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Integer getNumero() { return numero; }
    public void setNumero(Integer numero) { this.numero = numero; }
    
    public StatutStand getStatut() { return statut; }
    public void setStatut(StatutStand statut) { this.statut = statut; }
    
    public TailleStand getTaille() { return taille; }
    public void setTaille(TailleStand taille) { this.taille = taille; }
    
    public String getZone() { return zone; }
    public void setZone(String zone) { this.zone = zone; }
    
    public Entreprise getEntreprise() { return entreprise; }
    public void setEntreprise(Entreprise entreprise) { this.entreprise = entreprise; }

    public enum StatutStand {
        LIBRE, OCCUPE, RESERVE
    }

    public enum TailleStand {
        SMALL, MEDIUM, LARGE
    }
}
