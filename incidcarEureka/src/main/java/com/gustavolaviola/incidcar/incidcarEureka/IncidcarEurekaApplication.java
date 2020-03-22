package com.gustavolaviola.incidcar.incidcarEureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class IncidcarEurekaApplication {

	public static void main(String[] args) {
		SpringApplication.run(IncidcarEurekaApplication.class, args);
	}

}
