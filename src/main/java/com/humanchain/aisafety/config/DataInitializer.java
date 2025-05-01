package com.humanchain.aisafety.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.humanchain.aisafety.model.Incident;
import com.humanchain.aisafety.repository.IncidentRepository;

@Configuration
public class DataInitializer {

    @Autowired
    private IncidentRepository incidentRepository;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // Add sample incidents
            Incident incident1 = new Incident();
            incident1.setTitle("Image Manipulation Detection Failure");
            incident1.setDescription("AI system failed to detect manipulated images, potentially allowing misleading content to be distributed on the platform.");
            incident1.setSeverity("High");

            Incident incident2 = new Incident();
            incident2.setTitle("Biased Recommendation Algorithm");
            incident2.setDescription("User feedback suggests the recommendation algorithm is displaying bias toward certain demographic groups by consistently suggesting different content.");
            incident2.setSeverity("Medium");

            Incident incident3 = new Incident();
            incident3.setTitle("Privacy Breach in Voice Command Processing");
            incident3.setDescription("Voice assistant recorded and processed conversations when not explicitly activated, potentially compromising user privacy.");
            incident3.setSeverity("High");

            // Save to repository
            incidentRepository.save(incident1);
            incidentRepository.save(incident2);
            incidentRepository.save(incident3);
        };
    }
}
