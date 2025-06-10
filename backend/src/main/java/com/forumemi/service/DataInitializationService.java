
package com.forumemi.service;

import com.forumemi.model.*;
import com.forumemi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private UtilisateurRepository utilisateurRepository;
    
    @Autowired
    private SalleRepository salleRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeUsers();
        initializeRooms();
    }

    private void initializeUsers() {
        if (utilisateurRepository.count() == 0) {
            // Create admin user
            MembreEquipeLogistique admin = new MembreEquipeLogistique();
            admin.setNom("Admin");
            admin.setPrenom("Forum EMI");
            admin.setEmail("admin@emi.ac.ma");
            admin.setMotDePasse("admin123");
            admin.setRole(Utilisateur.Role.ADMIN);
            utilisateurRepository.save(admin);

            // Create team members
            MembreEquipeLogistique membre1 = new MembreEquipeLogistique();
            membre1.setNom("Alami");
            membre1.setPrenom("Sara");
            membre1.setEmail("sara.alami@emi.ac.ma");
            membre1.setMotDePasse("sara123");
            membre1.setRole(Utilisateur.Role.EQUIPIER);
            utilisateurRepository.save(membre1);

            MembreEquipeLogistique membre2 = new MembreEquipeLogistique();
            membre2.setNom("Bennani");
            membre2.setPrenom("Ahmed");
            membre2.setEmail("ahmed.bennani@emi.ac.ma");
            membre2.setMotDePasse("ahmed123");
            membre2.setRole(Utilisateur.Role.EQUIPIER);
            utilisateurRepository.save(membre2);

            MembreEquipeLogistique membre3 = new MembreEquipeLogistique();
            membre3.setNom("Chakir");
            membre3.setPrenom("Fatima");
            membre3.setEmail("fatima.chakir@emi.ac.ma");
            membre3.setMotDePasse("fatima123");
            membre3.setRole(Utilisateur.Role.EQUIPIER);
            utilisateurRepository.save(membre3);

            MembreEquipeLogistique membre4 = new MembreEquipeLogistique();
            membre4.setNom("Idrissi");
            membre4.setPrenom("Omar");
            membre4.setEmail("omar.idrissi@emi.ac.ma");
            membre4.setMotDePasse("omar123");
            membre4.setRole(Utilisateur.Role.EQUIPIER);
            utilisateurRepository.save(membre4);
        }
    }

    private void initializeRooms() {
        if (salleRepository.count() == 0) {
            Salle sallePolyvalente = new Salle(1, 480);
            salleRepository.save(sallePolyvalente);

            Salle grandAmphi = new Salle(2, 220);
            salleRepository.save(grandAmphi);
        }
    }
}
