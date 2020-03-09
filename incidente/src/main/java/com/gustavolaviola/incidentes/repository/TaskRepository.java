package com.gustavolaviola.incidentes.repository;

import com.gustavolaviola.incidentes.model.Task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

}
