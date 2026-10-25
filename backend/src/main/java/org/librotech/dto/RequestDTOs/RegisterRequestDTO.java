package org.librotech.dto.RequestDTOs;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;

public record RegisterRequestDTO(
        @NotBlank(message = "Email is required")
        @Email(message = "Email is not valid")
        String email,
        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        @Pattern(
                regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$",
                message = "Password must contain at least one digit, one lowercase letter, and one uppercase letter"
        )
        String password,
        @Pattern(
                regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$",
                message = "Password must contain at least one digit, one lowercase letter, and one uppercase letter"
        )
        String confirmPassword,

        @NotBlank(message = "Name is required")
        @Size(min = 2, message = "Name must be at least 2 characters long")
        String name,
        @NotBlank(message = "Last name is required")
        @Size(min = 2, message = "Last name must be at least 2 characters long")
        String lastName
) {
}
