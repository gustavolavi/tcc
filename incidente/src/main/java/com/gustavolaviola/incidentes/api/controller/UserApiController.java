package com.gustavolaviola.incidentes.api.controller;

import com.gustavolaviola.incidentes.model.User;
import com.gustavolaviola.incidentes.repository.UserRepository;
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
@RequestMapping("/api/user")
public class UserApiController {
	private UserRepository userRepository;
	
	@Autowired
	public UserApiController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@RequestMapping(method = RequestMethod.GET, produces = { "application/json", "application/xml" })
	public ResponseEntity getAll() {
		return ResponseEntity.ok(userRepository.findAll());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET,  produces = { "application/json", "application/xml" })
	public ResponseEntity get(@PathVariable int id) {
		return ResponseEntity.ok(userRepository.findById(id));
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.POST,  produces = { "application/json", "application/xml" })
	public ResponseEntity create(UriComponentsBuilder uriComponentsBuilder,User user) {
		user = userRepository.save(user);
		UriComponents uriComponents = uriComponentsBuilder.path("/user/{id}").buildAndExpand(user.getId());
	    return ResponseEntity.ok(user).created(uriComponents.toUri()).build();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT,  produces = { "application/json", "application/xml" })
	public ResponseEntity update(UriComponentsBuilder uriComponentsBuilder,@PathVariable int id,User user) {
		user.setId(id);
		userRepository.save(user);
		UriComponents uriComponents = uriComponentsBuilder.path("/user/{id}").buildAndExpand(user.getId());
	    return ResponseEntity.ok(uriComponents.toUri());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE,  produces = { "application/json", "application/xml" })
	public ResponseEntity delete(@PathVariable int id) {
		Optional<User> user = userRepository.findById(id);
		if(user.isPresent()) {
			userRepository.delete(user.get());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	
}
