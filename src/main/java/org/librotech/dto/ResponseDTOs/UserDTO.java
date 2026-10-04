package org.librotech.dto.ResponseDTOs;

import jakarta.persistence.*;
import org.librotech.model.Role;

import java.util.UUID;

public record UserDTO(
                String name,
                String lastName,
                String email,
                Role role
) {
}
