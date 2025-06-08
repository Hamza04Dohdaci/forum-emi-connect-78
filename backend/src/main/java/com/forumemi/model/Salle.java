
package com.forumemi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "salles")
public class Salle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(unique = true)
    private Integer numero;

    @NotNull
    @Min(value = 1, message = "La capacité doit être d'au moins 1 personne")
    private Integer capacite;

    @OneToMany(mappedBy = "salle")
    private List<Conference> conferences;

    public Salle() {}

    public Salle(Integer numero, Integer capacite) {
        this.numero = numero;
        this.capacite = capacite;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Integer getNumero() { return numero; }
    public void setNumero(Integer numero) { this.numero = numero; }
    
    public Integer getCapacite() { return capacite; }
    public void setCapacite(Integer capacite) { this.capacite = capacite; }
    
    public List<Conference> getConferences() { return conferences; }
    public void setConferences(List<Conference> conferences) { this.conferences = conferences; }
}
