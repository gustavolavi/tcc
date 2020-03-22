package com.gustavolaviola.incidentes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gustavolaviola.incidentes.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.username = ?1 OR u.email = ?1")
    User findByUsername(String username);
}
