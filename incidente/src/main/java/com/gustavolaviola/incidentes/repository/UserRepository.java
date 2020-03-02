package com.gustavolaviola.incidentes.repository;

import org.springframework.data.repository.CrudRepository;

import com.gustavolaviola.incidentes.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}
