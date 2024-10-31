package uce.ec.BDmq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync(proxyTargetClass=true)
public class BDmqApplication {

	public static void main(String[] args) {
		SpringApplication.run(BDmqApplication.class, args);
	}

}
