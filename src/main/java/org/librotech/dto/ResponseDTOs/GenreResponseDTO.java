package org.librotech.dto.ResponseDTOs;

import java.util.List;

public record GenreResponseDTO
        (
                String name,
                List<BookResponseDTO> books
        ){
}
