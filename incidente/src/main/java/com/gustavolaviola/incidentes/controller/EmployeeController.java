package com.gustavolaviola.incidentes.controller;

import java.util.Optional;

import com.gustavolaviola.incidentes.model.Employee;
import com.gustavolaviola.incidentes.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;


@Controller
@RequestMapping("/employee")
public class EmployeeController {
	private EmployeeRepository employeeRepository;
	
	@Autowired
	public EmployeeController(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}
	

	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView getAll() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("employees", employeeRepository.findAll());
        
        modelAndView.setViewName( "employee/employee");
        return modelAndView;
	}

	@RequestMapping(path = {"/edit", "/edit/{id}"})
	public ModelAndView editUserById(@PathVariable("id") Optional<Integer> id)
	{
		ModelAndView modelAndView = new ModelAndView();

		if (id.isPresent()) {
			Employee entity = employeeRepository.findById(id.get()).get();
			modelAndView.addObject("employee", entity);
		} else {
			modelAndView.addObject("employee", new Employee());
		}
        modelAndView.setViewName( "employee/add-edit-user");
		return modelAndView;
	}
	
	
}
