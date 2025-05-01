package com.humanchain.aisafety.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.humanchain.aisafety.model.Incident;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
}
