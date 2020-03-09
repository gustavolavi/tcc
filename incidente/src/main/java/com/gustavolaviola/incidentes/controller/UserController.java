package com.gustavolaviola.incidentes.controller;

import com.gustavolaviola.incidentes.model.User;
import com.gustavolaviola.incidentes.repository.UserRepository;
import com.gustavolaviola.incidentes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;


@Controller
@RequestMapping("/user")
public class UserController {
	private final UserRepository userRepository;
    private final UserService userService;
	private final ModelAndView modelAndView;

	@Autowired
	public UserController(final UserRepository userRepository, final UserService userService) {
		this.userRepository = userRepository;
		this.userService = userService;
		this.modelAndView = new ModelAndView();
		
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView getAll() {
		
        final Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        final User user = userService.findUserByUsername(auth.getName());
        modelAndView.addObject("userName", "Welcome " + user.getUsername() + "/" + user.getName() + " (" + user.getEmail() + ")");
		modelAndView.addObject("users", userRepository.findAll());
        
        modelAndView.setViewName( "user/user");
        return modelAndView;
	}

	@RequestMapping(path = {"/edit", "/edit/{id}"})
	public ModelAndView editUserById(@PathVariable("id") final Optional<Integer> id)
	{

		if (id.isPresent()) {
			final User entity = userRepository.findById(id.get()).get();
			modelAndView.addObject("user", entity);
		} else {
			modelAndView.addObject("user", new User());
		}
        modelAndView.setViewName( "user/add-edit-user");
		return modelAndView;
	}

	
}
