package com.gustavolaviola.incidentes.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User implements Serializable{
	private static final long serialVersionUID = 4046182767832994153L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;	
	@NotEmpty
	private String name;
	@NotEmpty
    @Column(nullable = false, unique = true)
	private String email;
	@NotEmpty
	private String password;
	@NotEmpty
    @Column(nullable = false, unique = true)
	private String username;
	
	@OneToOne(mappedBy = "user")
	@JsonIgnoreProperties({"user"})
	private Employee employee;
	

}
