package com.gustavolaviola.incidentes.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Incident {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

    @ManyToOne
    @JoinColumn(name = "id_user")
	private User user;
	private String title;
	@Lob
	private String description;
	
}
