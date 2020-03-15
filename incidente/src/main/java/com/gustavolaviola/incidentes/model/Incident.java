package com.gustavolaviola.incidentes.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Incident implements Serializable{

	private static final long serialVersionUID = 3685437328573733780L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

    @ManyToOne
	@JoinColumn(name = "id_user")
	private User user;

	@ManyToOne
    @JoinColumn(name = "id_employeer")
	private Employee employee;

	private String title;
	@Lob
	private String description;
	
}
