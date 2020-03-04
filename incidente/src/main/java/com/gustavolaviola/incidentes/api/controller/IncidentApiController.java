package com.gustavolaviola.incidentes.api.controller;

import com.gustavolaviola.incidentes.model.Incident;
import com.gustavolaviola.incidentes.repository.IncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/incident")
public class IncidentApiController {
	private IncidentRepository incidentRepository;
	
	@Autowired
	public IncidentApiController(IncidentRepository incidentRepository) {
		this.incidentRepository = incidentRepository;
	}

	@RequestMapping(method = RequestMethod.GET, produces = { "application/json", "application/xml" })
	public ResponseEntity getAll() {
		List<Incident> i = incidentRepository.findAll();
		System.out.println(i);
		return ResponseEntity.ok(i);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET,  produces = { "application/json", "application/xml" })
	public ResponseEntity get(@PathVariable int id) {
		return ResponseEntity.ok(incidentRepository.findById(id));
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.POST,  produces = { "application/json", "application/xml" })
	public ResponseEntity create(UriComponentsBuilder uriComponentsBuilder,Incident incident) {
		incident = incidentRepository.save(incident);
		UriComponents uriComponents = uriComponentsBuilder.path("/incident/{id}").buildAndExpand(incident.getId());
	    return ResponseEntity.ok(incident).created(uriComponents.toUri()).build();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT,  produces = { "application/json", "application/xml" })
	public ResponseEntity update(UriComponentsBuilder uriComponentsBuilder,@PathVariable int id,Incident incident) {
		incident.setId(id);
		incidentRepository.save(incident);
		UriComponents uriComponents = uriComponentsBuilder.path("/incident/{id}").buildAndExpand(incident.getId());
	    return ResponseEntity.ok(uriComponents.toUri());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE,  produces = { "application/json", "application/xml" })
	public ResponseEntity delete(@PathVariable int id) {
		Optional<Incident> incident = incidentRepository.findById(id);
		if(incident.isPresent()) {
			incidentRepository.delete(incident.get());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	
}
