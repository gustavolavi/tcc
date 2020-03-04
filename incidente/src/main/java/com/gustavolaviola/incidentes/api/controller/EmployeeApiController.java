package com.gustavolaviola.incidentes.api.controller;

import com.gustavolaviola.incidentes.model.Employee;
import com.gustavolaviola.incidentes.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;


@RestController
@RequestMapping("/api/employee")
public class EmployeeApiController {
	private EmployeeRepository employeeRepository;
	
	@Autowired
	public EmployeeApiController(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}
	
	@RequestMapping(method = RequestMethod.GET, produces = { "application/json", "application/xml" })
	public ResponseEntity getAll() {
		return ResponseEntity.ok(employeeRepository.findAll());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET,  produces = { "application/json", "application/xml" })
	public ResponseEntity get(@PathVariable int id) {
		return ResponseEntity.ok(employeeRepository.findById(id));
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.POST,  produces = { "application/json", "application/xml" })
	public ResponseEntity create(UriComponentsBuilder uriComponentsBuilder,Employee employee) {
		employee = employeeRepository.save(employee);
		UriComponents uriComponents = uriComponentsBuilder.path("/employee/{id}").buildAndExpand(employee.getId());
	    return ResponseEntity.ok(employee).created(uriComponents.toUri()).build();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT,  produces = { "application/json", "application/xml" })
	public ResponseEntity update(UriComponentsBuilder uriComponentsBuilder,@PathVariable int id,Employee employee) {
		employee.setId(id);
		employeeRepository.save(employee);
		UriComponents uriComponents = uriComponentsBuilder.path("/employee/{id}").buildAndExpand(employee.getId());
	    return ResponseEntity.ok(uriComponents.toUri());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE,  produces = { "application/json", "application/xml" })
	public ResponseEntity delete(@PathVariable int id) {
		Optional<Employee> employee = employeeRepository.findById(id);
		if(employee.isPresent()) {
			employeeRepository.delete(employee.get());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	
}
