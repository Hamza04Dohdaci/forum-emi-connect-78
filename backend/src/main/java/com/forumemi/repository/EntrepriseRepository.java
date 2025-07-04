
package com.forumemi.repository;

import com.forumemi.model.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntrepriseRepository extends JpaRepository<Entreprise, Long> {
    boolean existsByNom(String nom);
}
