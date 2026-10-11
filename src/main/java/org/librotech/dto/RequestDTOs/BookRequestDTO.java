package org.librotech.dto.RequestDTOs;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.ISBN;
import org.librotech.model.Editorial;
import org.librotech.model.Genre;

import java.util.HashSet;
import java.util.Set;

public record BookRequestDTO (
        @NotNull(message = "Title cannot be null")
        String title,

        @NotNull(message = "Author cannot be null")
        String author,

        @ISBN(message = "Invalid ISBN")
        String isbn,

        @NotNull(message = "Genre IDs cannot be null")
        Set<Long> genreIds,

        @NotNull(message = "Editorial ID cannot be null")
        Long editorialId,

        @NotNull(message = "Year cannot be null")
        int year,

        @NotNull(message = "Pages cannot be null")
        int pages,

        @NotNull(message = "Summary cannot be null")
        String summary
) {
}
