package com.gustavolaviola.incidcar.incidcarZuul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
@EnableDiscoveryClient
public class IncidcarZuulApplication {

	public static void main(String[] args) {
		SpringApplication.run(IncidcarZuulApplication.class, args);
	}

}
