package com.humanchain.aisafety.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.humanchain.aisafety.dto.IncidentDTO;
import com.humanchain.aisafety.model.Incident;
import com.humanchain.aisafety.service.IncidentService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class IncidentController {

    @Autowired
    private IncidentService incidentService;

    @GetMapping("/incidents")
    public ResponseEntity<List<Incident>> getAllIncidents() {
        return ResponseEntity.ok(incidentService.getAllIncidents());
    }

    @GetMapping("/incidents/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(incidentService.getIncidentById(id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/incidents")
    public ResponseEntity<Incident> createIncident(@Valid @RequestBody IncidentDTO incidentDTO) {
        Incident createdIncident = incidentService.createIncident(incidentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdIncident);
    }

    @DeleteMapping("/incidents/{id}")
    public ResponseEntity<?> deleteIncident(@PathVariable Long id) {
        try {
            incidentService.deleteIncident(id);
            return ResponseEntity.ok(Map.of("message", "Incident deleted successfully"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
