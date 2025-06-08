
package com.forumemi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "taches")
public class Tache {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La description est obligatoire")
    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private StatutTache statut = StatutTache.EN_ATTENTE;

    @NotNull(message = "La date limite est obligatoire")
    private LocalDate dateLimite;

    @Enumerated(EnumType.STRING)
    private PrioriteTache priorite = PrioriteTache.MEDIUM;

    @ManyToOne
    @JoinColumn(name = "responsable_id")
    private MembreEquipeLogistique responsable;

    public Tache() {}

    public Tache(String description, LocalDate dateLimite, MembreEquipeLogistique responsable) {
        this.description = description;
        this.dateLimite = dateLimite;
        this.responsable = responsable;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public StatutTache getStatut() { return statut; }
    public void setStatut(StatutTache statut) { this.statut = statut; }
    
    public LocalDate getDateLimite() { return dateLimite; }
    public void setDateLimite(LocalDate dateLimite) { this.dateLimite = dateLimite; }
    
    public PrioriteTache getPriorite() { return priorite; }
    public void setPriorite(PrioriteTache priorite) { this.priorite = priorite; }
    
    public MembreEquipeLogistique getResponsable() { return responsable; }
    public void setResponsable(MembreEquipeLogistique responsable) { this.responsable = responsable; }

    public enum StatutTache {
        EN_ATTENTE, EN_COURS, TERMINEE
    }

    public enum PrioriteTache {
        LOW, MEDIUM, HIGH
    }
}
