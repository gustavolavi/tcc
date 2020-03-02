package com.gustavolaviola.incidentes.controller;

import java.util.Optional;

import com.gustavolaviola.incidentes.model.User;
import com.gustavolaviola.incidentes.repository.UserRepository;

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


@RestController
@RequestMapping("/user")
public class UserController {
	private UserRepository userRepository;
	
	@Autowired
	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@GetMapping
	public ResponseEntity getAll() {
		return ResponseEntity.ok(userRepository.findAll());
	}
	
	@GetMapping("{id}")
	public ResponseEntity get(@PathVariable int id) {
		return ResponseEntity.ok(userRepository.findById(id));
	}
	
	@PostMapping
	public ResponseEntity create(UriComponentsBuilder uriComponentsBuilder,User user) {
		user = userRepository.save(user);
		UriComponents uriComponents = uriComponentsBuilder.path("/user/{id}").buildAndExpand(user.getId());
	    return ResponseEntity.ok(user).created(uriComponents.toUri()).build();
	}
	
	@PutMapping("{id}")
	public ResponseEntity update(UriComponentsBuilder uriComponentsBuilder,@PathVariable int id,User user) {
		user.setId(id);
		userRepository.save(user);
		UriComponents uriComponents = uriComponentsBuilder.path("/user/{id}").buildAndExpand(user.getId());
	    return ResponseEntity.ok(uriComponents.toUri());
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity delete(@PathVariable int id) {
		Optional<User> user = userRepository.findById(id);
		if(user.isPresent()) {
			userRepository.delete(user.get());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	
}
