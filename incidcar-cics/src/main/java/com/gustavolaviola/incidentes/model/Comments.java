package com.gustavolaviola.incidentes.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Comments implements Serializable{

	private static final long serialVersionUID = 5227778611574761657L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
    
	@Lob
	private String description;
    
	@OneToOne
	@JsonIgnoreProperties({"employee"})
	private User user;
	
	@OneToOne
	@JsonIgnoreProperties({"employee","user", "comments"})
	private Incident incident;
	
}
