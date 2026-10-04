package org.librotech.dto.ResponseDTOs;

import java.util.List;

public record BookResponseDTO(
        String name,
        String author,
        String isbn,
        int year,
        int pages,
        String summary,
        EditorialResponseDTO editorial,
        List<GenreResponseDTO> genres
) {
}
