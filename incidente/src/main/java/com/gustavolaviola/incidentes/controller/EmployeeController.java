package com.gustavolaviola.incidentes.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.gustavolaviola.incidentes.model.Employee;
import com.gustavolaviola.incidentes.repository.EmployeeRepository;


@RestController
@RequestMapping("/employee")
public class EmployeeController {
	private EmployeeRepository employeeRepository;
	
	@Autowired
	public EmployeeController(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}
	
	@GetMapping
	public ResponseEntity getAll() {
		return ResponseEntity.ok(employeeRepository.findAll());
	}
	
	@GetMapping("{id}")
	public ResponseEntity get(@PathVariable int id) {
		return ResponseEntity.ok(employeeRepository.findById(id));
	}
	
	@PostMapping
	public ResponseEntity create(UriComponentsBuilder uriComponentsBuilder,Employee employee) {
		employee = employeeRepository.save(employee);
		UriComponents uriComponents = uriComponentsBuilder.path("/employee/{id}").buildAndExpand(employee.getId());
	    return ResponseEntity.ok(employee).created(uriComponents.toUri()).build();
	}
	
	@PutMapping("{id}")
	public ResponseEntity update(UriComponentsBuilder uriComponentsBuilder,@PathVariable int id,Employee employee) {
		employee.setId(id);
		employeeRepository.save(employee);
		UriComponents uriComponents = uriComponentsBuilder.path("/employee/{id}").buildAndExpand(employee.getId());
	    return ResponseEntity.ok(uriComponents.toUri());
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity delete(@PathVariable int id) {
		Optional<Employee> employee = employeeRepository.findById(id);
		if(employee.isPresent()) {
			employeeRepository.delete(employee.get());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	
}
