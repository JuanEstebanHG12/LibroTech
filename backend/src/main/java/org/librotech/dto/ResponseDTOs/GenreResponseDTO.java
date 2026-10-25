package org.librotech.dto.ResponseDTOs;

import java.util.List;

public record GenreResponseDTO
        (
                Long id,
                String name,
                List<BookResponseDTO> books
        ){
}
