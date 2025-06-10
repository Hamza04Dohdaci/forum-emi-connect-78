
package com.forumemi.repository;

import com.forumemi.model.Stand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StandRepository extends JpaRepository<Stand, Long> {
    List<Stand> findByZone(String zone);
    boolean existsByNumero(Integer numero);
}
