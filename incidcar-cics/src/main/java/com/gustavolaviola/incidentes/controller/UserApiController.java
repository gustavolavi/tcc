package com.gustavolaviola.incidentes.controller;

import com.gustavolaviola.incidentes.model.User;
import com.gustavolaviola.incidentes.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;


@RestController
@RequestMapping("/users")
public class UserApiController {
	private final UserRepository userRepository;
	
	@Autowired
	public UserApiController(final UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@RequestMapping(method = RequestMethod.GET, produces = { "application/json", "application/xml" })
	public ResponseEntity<?> getAll() {
		return ResponseEntity.ok(userRepository.findAll());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET,  produces = { "application/json", "application/xml" })
	public ResponseEntity<?> get(@PathVariable final int id) {
		return ResponseEntity.ok(userRepository.findById(id));
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST,  produces = { "application/json", "application/xml" })
	public ResponseEntity<?> login(final UriComponentsBuilder uriComponentsBuilder,@RequestBody User user) {
		User login =  userRepository.findByUsername(user.getUsername());
		if(login.getPassword().equals(user.getPassword()))
			return ResponseEntity.ok(login);
		
		return ResponseEntity.notFound().build();
		
	}

	@RequestMapping(method = RequestMethod.POST,  produces = { "application/json", "application/xml" })
	public ResponseEntity<?> create(final UriComponentsBuilder uriComponentsBuilder,@RequestBody User user) {
		user = userRepository.save(user);
		final UriComponents uriComponents = uriComponentsBuilder.path("/user/{id}").buildAndExpand(user.getId());
	    ResponseEntity.ok(user);
		return ResponseEntity.created(uriComponents.toUri()).build();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT,  produces = { "application/json", "application/xml" })
	public ResponseEntity<?> update(final UriComponentsBuilder uriComponentsBuilder,@PathVariable final int id,@RequestBody User user) {
		user.setId(id);
		userRepository.save(user);
		final UriComponents uriComponents = uriComponentsBuilder.path("/user/{id}").buildAndExpand(user.getId());
	    return ResponseEntity.ok(uriComponents.toUri());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE,  produces = { "application/json", "application/xml" })
	public ResponseEntity<?> delete(@PathVariable final int id) {
		final Optional<User> user = userRepository.findById(id);
		if(user.isPresent()) {
			userRepository.delete(user.get());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	
}
