package com.gustavolaviola.incidentes.repository;

import org.springframework.data.repository.CrudRepository;

import com.gustavolaviola.incidentes.model.Process;

public interface ProcessRepository extends CrudRepository<Process, Integer> {

}
