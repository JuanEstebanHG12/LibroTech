package org.librotech.dto.simpleDTOs;

import java.util.List;

public record BookSimpleDTO(
        Long id,
        String title,
        String author,
        String isbn,
        String summary,
        int year,
        int pages,
        List<GenreSimpleDTO> genres
) {
}
