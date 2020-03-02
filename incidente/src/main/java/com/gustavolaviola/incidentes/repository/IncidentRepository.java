package com.gustavolaviola.incidentes.repository;

import org.springframework.data.repository.CrudRepository;

import com.gustavolaviola.incidentes.model.Incident;

public interface IncidentRepository extends CrudRepository<Incident, Integer> {

}
