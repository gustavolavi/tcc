package com.gustavolaviola.incidentes.repository;

import com.gustavolaviola.incidentes.model.Incident;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Integer> {

}
