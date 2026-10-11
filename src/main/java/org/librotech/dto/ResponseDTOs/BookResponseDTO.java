package org.librotech.dto.ResponseDTOs;

import org.librotech.dto.simpleDTOs.EditorialSimpleDTO;
import org.librotech.dto.simpleDTOs.GenreSimpleDTO;

import java.util.List;

public record BookResponseDTO(
        Long id,
        String title,
        String author,
        String isbn,
        int year,
        int pages,
        String summary,
        EditorialSimpleDTO editorial,
        List<GenreSimpleDTO> genres
) {
}
