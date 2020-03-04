package com.gustavolaviola.incidentes.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.gustavolaviola.incidentes.model.Employee;
import com.gustavolaviola.incidentes.repository.EmployeeRepository;


@Controller
@RequestMapping("/employee")
public class EmployeeController {
	private EmployeeRepository employeeRepository;
	
	@Autowired
	public EmployeeController(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public String getAll() {
		employeeRepository.findAll();
		return "index";
	}

	@RequestMapping(value = "/{id}}")
	public String get(@PathVariable int id) {
		employeeRepository.findById(id);
		return "index";
	}

	@RequestMapping(value = "/{id}}", method = RequestMethod.POST)
	public String create(Employee employee) {
		employee = employeeRepository.save(employee);

		return "index";
	}

	@RequestMapping(value = "/update/{id}}", method = RequestMethod.POST)
	public String update(@PathVariable int id,Employee employee) {
		employee.setId(id);
		employeeRepository.save(employee);
		return "index";
	}

	@RequestMapping(value = "/delete/{id}}")
	public String delete(@PathVariable int id) {
		Optional<Employee> employee = employeeRepository.findById(id);
		if(employee.isPresent()) {
			employeeRepository.delete(employee.get());
		}
		return "index";
	}
	
	
}
