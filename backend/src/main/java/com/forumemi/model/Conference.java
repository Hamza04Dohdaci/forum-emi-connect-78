
package com.forumemi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "conferences")
public class Conference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le titre est obligatoire")
    @Size(max = 200)
    private String titre;

    @NotNull(message = "La date de début est obligatoire")
    private LocalDateTime dateDebut;

    @NotNull(message = "La date de fin est obligatoire")
    private LocalDateTime dateFin;

    @ManyToOne
    @JoinColumn(name = "salle_id")
    private Salle salle;

    @ManyToMany
    @JoinTable(
        name = "conference_intervenants",
        joinColumns = @JoinColumn(name = "conference_id"),
        inverseJoinColumns = @JoinColumn(name = "intervenant_id")
    )
    private List<Intervenant> intervenants;

    public Conference() {}

    public Conference(String titre, LocalDateTime dateDebut, LocalDateTime dateFin, Salle salle) {
        this.titre = titre;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.salle = salle;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    
    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }
    
    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }
    
    public Salle getSalle() { return salle; }
    public void setSalle(Salle salle) { this.salle = salle; }
    
    public List<Intervenant> getIntervenants() { return intervenants; }
    public void setIntervenants(List<Intervenant> intervenants) { this.intervenants = intervenants; }
}
