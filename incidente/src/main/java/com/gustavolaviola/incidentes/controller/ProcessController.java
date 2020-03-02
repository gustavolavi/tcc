package com.gustavolaviola.incidentes.controller;

import java.util.Optional;

import com.gustavolaviola.incidentes.model.Process;
import com.gustavolaviola.incidentes.repository.ProcessRepository;

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
@RequestMapping("/process")
public class ProcessController {
	private ProcessRepository processRepository;
	
	@Autowired
	public ProcessController(ProcessRepository processRepository) {
		this.processRepository = processRepository;
	}
	
	@GetMapping
	public ResponseEntity getAll() {
		return ResponseEntity.ok(processRepository.findAll());
	}
	
	@GetMapping("{id}")
	public ResponseEntity get(@PathVariable int id) {
		return ResponseEntity.ok(processRepository.findById(id));
	}
	
	@PostMapping
	public ResponseEntity create(UriComponentsBuilder uriComponentsBuilder,Process process) {
		process = processRepository.save(process);
		UriComponents uriComponents = uriComponentsBuilder.path("/process/{id}").buildAndExpand(process.getId());
	    return ResponseEntity.ok(process).created(uriComponents.toUri()).build();
	}
	
	@PutMapping("{id}")
	public ResponseEntity update(UriComponentsBuilder uriComponentsBuilder,@PathVariable int id,Process process) {
		process.setId(id);
		processRepository.save(process);
		UriComponents uriComponents = uriComponentsBuilder.path("/process/{id}").buildAndExpand(process.getId());
	    return ResponseEntity.ok(uriComponents.toUri());
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity delete(@PathVariable int id) {
		Optional<Process> process = processRepository.findById(id);
		if(process.isPresent()) {
			processRepository.delete(process.get());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	
}
