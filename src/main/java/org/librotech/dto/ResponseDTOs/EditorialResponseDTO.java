package org.librotech.dto.ResponseDTOs;

import java.util.List;

public record EditorialResponseDTO(
        String name,
        List<BookResponseDTO> books
) {
}
