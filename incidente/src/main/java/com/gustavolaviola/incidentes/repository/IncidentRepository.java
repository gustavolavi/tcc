package com.gustavolaviola.incidentes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gustavolaviola.incidentes.model.Incident;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Integer> {

    @Override
    @Query(value = "SELECT * FROM incident",
            nativeQuery = true)
    List<Incident> findAll();
}
