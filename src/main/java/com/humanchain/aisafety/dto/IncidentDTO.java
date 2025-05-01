package com.humanchain.aisafety.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class IncidentDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Severity is required")
    @Pattern(regexp = "^(Low|Medium|High)$", message = "Severity must be one of: Low, Medium, High")
    private String severity;
}
