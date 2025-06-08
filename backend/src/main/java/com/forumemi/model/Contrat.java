
package com.forumemi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;

@Entity
@Table(name = "contrats")
public class Contrat {
    @Id
    private String id;

    @NotNull
    @Positive(message = "Le montant doit être positif")
    private Double montant;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le type de contrat est obligatoire")
    private TypeContrat type;

    @NotNull(message = "La date est obligatoire")
    private LocalDate date;

    @OneToOne(mappedBy = "contrat")
    private Partenaire partenaire;

    public Contrat() {}

    public Contrat(String id, Double montant, TypeContrat type, LocalDate date) {
        this.id = id;
        this.montant = montant;
        this.type = type;
        this.date = date;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public Double getMontant() { return montant; }
    public void setMontant(Double montant) { this.montant = montant; }
    
    public TypeContrat getType() { return type; }
    public void setType(TypeContrat type) { this.type = type; }
    
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    
    public Partenaire getPartenaire() { return partenaire; }
    public void setPartenaire(Partenaire partenaire) { this.partenaire = partenaire; }
}
