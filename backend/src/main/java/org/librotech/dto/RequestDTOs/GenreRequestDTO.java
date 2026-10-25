package org.librotech.dto.RequestDTOs;

import jakarta.validation.constraints.NotBlank;

public record GenreRequestDTO(
        @NotBlank(message = "Name is required")
        String name
) {
}
