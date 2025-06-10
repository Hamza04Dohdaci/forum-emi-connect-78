
package com.forumemi.repository;

import com.forumemi.model.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalleRepository extends JpaRepository<Salle, Long> {
    boolean existsByNumero(Integer numero);
}
