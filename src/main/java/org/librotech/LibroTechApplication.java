package org.librotech;

import me.paulschwarz.springdotenv.spring.DotenvApplicationInitializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LibroTechApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(LibroTechApplication.class);
        app.addInitializers(new DotenvApplicationInitializer());
        app.run(args);
    }

}
