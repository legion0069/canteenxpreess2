package com.canteenxpress;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class CanteenXpressApplication {
    public static void main(String[] args) {
        SpringApplication.run(CanteenXpressApplication.class, args);
    }
}