package com.gustavolaviola.incidentes.repository;

import org.springframework.data.repository.CrudRepository;

import com.gustavolaviola.incidentes.model.Task;

public interface TaskRepository extends CrudRepository<Task, Integer> {

}
