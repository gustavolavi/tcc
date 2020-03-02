package com.gustavolaviola.incidentes.repository;

import org.springframework.data.repository.CrudRepository;

import com.gustavolaviola.incidentes.model.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {

}
