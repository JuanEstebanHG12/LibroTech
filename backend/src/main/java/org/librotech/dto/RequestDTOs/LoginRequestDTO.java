package org.librotech.dto.RequestDTOs;

import jakarta.validation.constraints.*;

public record LoginRequestDTO(
        @NotBlank(message = "Email is required")
        @Email(message = "Email is not valid")
        String email,
        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        String password
) {
}
