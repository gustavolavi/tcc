package com.gustavolaviola.incidentes.repository;

import com.gustavolaviola.incidentes.model.Process;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessRepository extends JpaRepository<Process, Integer> {

}
