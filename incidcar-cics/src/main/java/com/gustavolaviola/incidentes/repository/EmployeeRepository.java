package com.gustavolaviola.incidentes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gustavolaviola.incidentes.model.Employee;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}
