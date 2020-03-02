package com.gustavolaviola.incidentes.controller;

import java.util.Optional;

import com.gustavolaviola.incidentes.model.Incident;
import com.gustavolaviola.incidentes.repository.IncidentRepository;

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
@RequestMapping("/incident")
public class IncidentController {
	private IncidentRepository incidentRepository;
	
	@Autowired
	public IncidentController(IncidentRepository incidentRepository) {
		this.incidentRepository = incidentRepository;
	}
	
	@GetMapping
	public ResponseEntity getAll() {
		return ResponseEntity.ok(incidentRepository.findAll());
	}
	
	@GetMapping("{id}")
	public ResponseEntity get(@PathVariable int id) {
		return ResponseEntity.ok(incidentRepository.findById(id));
	}
	
	@PostMapping
	public ResponseEntity create(UriComponentsBuilder uriComponentsBuilder,Incident incident) {
		incident = incidentRepository.save(incident);
		UriComponents uriComponents = uriComponentsBuilder.path("/incident/{id}").buildAndExpand(incident.getId());
	    return ResponseEntity.ok(incident).created(uriComponents.toUri()).build();
	}
	
	@PutMapping("{id}")
	public ResponseEntity update(UriComponentsBuilder uriComponentsBuilder,@PathVariable int id,Incident incident) {
		incident.setId(id);
		incidentRepository.save(incident);
		UriComponents uriComponents = uriComponentsBuilder.path("/incident/{id}").buildAndExpand(incident.getId());
	    return ResponseEntity.ok(uriComponents.toUri());
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity delete(@PathVariable int id) {
		Optional<Incident> incident = incidentRepository.findById(id);
		if(incident.isPresent()) {
			incidentRepository.delete(incident.get());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	
}
