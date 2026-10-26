package org.librotech.dto.RequestDTOs;

import jakarta.validation.constraints.*;

public record LoginRequestDTO(
        @NotBlank(message = "Email is required")
        @Email(message = "Email is not valid")
        String email,
        @NotBlank(message = "Password is required")
        String password
) {
}
