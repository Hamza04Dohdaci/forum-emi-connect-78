
package com.forumemi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "membres_equipe_logistique")
public class MembreEquipeLogistique extends Utilisateur {
    
    public MembreEquipeLogistique() {
        super();
    }

    public MembreEquipeLogistique(String nom, String prenom, String email, String motDePasse) {
        super(nom, prenom, email, motDePasse, Role.EQUIPIER);
    }
}
