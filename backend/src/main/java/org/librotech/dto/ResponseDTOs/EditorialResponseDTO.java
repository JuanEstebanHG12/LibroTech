package org.librotech.dto.ResponseDTOs;

import org.librotech.dto.simpleDTOs.BookSimpleDTO;

import java.util.List;

public record EditorialResponseDTO(
        Long id,
        String name,
        List<BookSimpleDTO> books
) {
}
