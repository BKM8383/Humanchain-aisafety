package com.humanchain.aisafety.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.humanchain.aisafety.dto.IncidentDTO;
import com.humanchain.aisafety.model.Incident;
import com.humanchain.aisafety.repository.IncidentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class IncidentService {

    @Autowired
    private IncidentRepository incidentRepository;

    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    public Incident getIncidentById(Long id) {
        return incidentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Incident not found with id: " + id));
    }

    public Incident createIncident(IncidentDTO incidentDTO) {
        Incident incident = new Incident();
        incident.setTitle(incidentDTO.getTitle());
        incident.setDescription(incidentDTO.getDescription());
        incident.setSeverity(incidentDTO.getSeverity());
        return incidentRepository.save(incident);
    }

    public void deleteIncident(Long id) {
        if (!incidentRepository.existsById(id)) {
            throw new EntityNotFoundException("Incident not found with id: " + id);
        }
        incidentRepository.deleteById(id);
    }
}
