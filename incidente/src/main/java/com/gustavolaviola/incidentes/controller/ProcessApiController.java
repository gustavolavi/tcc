package com.gustavolaviola.incidentes.controller;

import com.gustavolaviola.incidentes.model.Process;
import com.gustavolaviola.incidentes.repository.ProcessRepository;
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
@RequestMapping("/processes")
public class ProcessApiController {
	private ProcessRepository processRepository;
	
	@Autowired
	public ProcessApiController(ProcessRepository processRepository) {
		this.processRepository = processRepository;
	}

	@RequestMapping(method = RequestMethod.GET, produces = { "application/json", "application/xml" })
	public ResponseEntity<?> getAll() {
		return ResponseEntity.ok(processRepository.findAll());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET,  produces = { "application/json", "application/xml" })
	public ResponseEntity<?> get(@PathVariable int id) {
		return ResponseEntity.ok(processRepository.findById(id));
	}

	@RequestMapping(method = RequestMethod.POST,  produces = { "application/json", "application/xml" })
	public ResponseEntity<?> create(UriComponentsBuilder uriComponentsBuilder,@RequestBody Process process) {
		process = processRepository.save(process);
		UriComponents uriComponents = uriComponentsBuilder.path("/process/{id}").buildAndExpand(process.getId());
	    ResponseEntity.ok(process);
		return ResponseEntity.created(uriComponents.toUri()).build();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT,  produces = { "application/json", "application/xml" })
	public ResponseEntity<?> update(UriComponentsBuilder uriComponentsBuilder,@PathVariable int id,@RequestBody Process process) {
		process.setId(id);
		processRepository.save(process);
		UriComponents uriComponents = uriComponentsBuilder.path("/process/{id}").buildAndExpand(process.getId());
	    return ResponseEntity.ok(uriComponents.toUri());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE,  produces = { "application/json", "application/xml" })
	public ResponseEntity<?> delete(@PathVariable int id) {
		Optional<Process> process = processRepository.findById(id);
		if(process.isPresent()) {
			processRepository.delete(process.get());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	
}
