package com.gustavolaviola.incidentes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gustavolaviola.incidentes.model.Incident;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Integer> {

}
