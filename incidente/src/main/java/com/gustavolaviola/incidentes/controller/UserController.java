package com.gustavolaviola.incidentes.controller;

import com.gustavolaviola.incidentes.model.Employee;
import com.gustavolaviola.incidentes.model.User;
import com.gustavolaviola.incidentes.repository.EmployeeRepository;
import com.gustavolaviola.incidentes.repository.UserRepository;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Optional;


@Controller
@RequestMapping("/user")
public class UserController {
	private UserRepository userRepository;

	@Autowired
	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public String getAll(Model model) {
		model.addAttribute("users", userRepository.findAll());
		return "user/user";
	}
	@RequestMapping(path = {"/edit", "/edit/{id}"})
	public String editUserById(Model model, @PathVariable("id") Optional<Integer> id)
	{
		if (id.isPresent()) {
			User entity = userRepository.findById(id.get()).get();
			model.addAttribute("user", entity);
		} else {
			model.addAttribute("user", new User());
		}
		return "user/add-edit-user";
	}

	
}
