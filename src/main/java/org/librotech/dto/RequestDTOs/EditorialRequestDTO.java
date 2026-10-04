package org.librotech.dto.RequestDTOs;

import jakarta.validation.constraints.NotBlank;

public record EditorialRequestDTO(
        @NotBlank(message = "El nombre de la editorial no puede ser nulo")
        String name
) {
}
