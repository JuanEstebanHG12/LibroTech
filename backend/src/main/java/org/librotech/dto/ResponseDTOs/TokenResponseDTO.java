package org.librotech.dto.ResponseDTOs;

public record TokenResponseDTO(
        String token,
        String refreshToken
) {
}
