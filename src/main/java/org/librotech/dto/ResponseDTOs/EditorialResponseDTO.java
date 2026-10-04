package org.librotech.dto.ResponseDTOs;

import java.util.List;

public record EditorialResponseDTO(
        Long id,
        String name,
        List<BookResponseDTO> books
) {
}
