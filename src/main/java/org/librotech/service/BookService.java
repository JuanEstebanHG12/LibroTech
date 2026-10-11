package org.librotech.service;

import org.librotech.Mapper.Mappers;
import org.librotech.dto.RequestDTOs.BookRequestDTO;
import org.librotech.dto.RequestDTOs.EditorialRequestDTO;
import org.librotech.dto.ResponseDTOs.BookResponseDTO;
import org.librotech.exception.EditorialNotFoundException;
import org.librotech.exception.GenreNotFoundException;
import org.librotech.model.Book;
import org.librotech.model.Editorial;
import org.librotech.model.Genre;
import org.librotech.repository.BookRepositry;
import org.librotech.repository.EditorialRepository;
import org.librotech.repository.GenreRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class BookService {
    private final BookRepositry bookRepositry;
    private final GenreRepository genreRepository;
    private final EditorialRepository editorialRepository;
    private final Mappers mappers;

    public BookService(BookRepositry bookRepositry, GenreRepository genreRepository, EditorialRepository editorialRepository, Mappers mappers) {
        this.bookRepositry = bookRepositry;
        this.genreRepository = genreRepository;
        this.editorialRepository = editorialRepository;
        this.mappers = mappers;
    }

    public Page<BookResponseDTO> findAll(Pageable pageable) {
        return bookRepositry.findAll(pageable).map(mappers::toBookResponseDTO);
    }

//    public BookResponseDTO addEditorial(Long editorialID, Long bookID) {
//        Editorial editorial = editorialRepository.findById(editorialID).orElseThrow();
//        Book book = bookRepositry.findById(bookID).orElseThrow();
//        book.setEditorial(editorial);
//        return mappers.toBookResponseDTO(bookRepositry.save(book));
//    }

    public BookResponseDTO findById(Long id) {
        return mappers.toBookResponseDTO(bookRepositry.findById(id).orElseThrow());
    }

    @Transactional
    public BookResponseDTO save(BookRequestDTO bookRequestDTO) {
        Editorial editorial = editorialRepository.findById(bookRequestDTO.editorialId()).orElseThrow(() -> new EditorialNotFoundException(bookRequestDTO.editorialId()));
        Set<Genre> genres = bookRequestDTO.genreIds().stream()
                .map(id -> genreRepository.findById(id).orElseThrow(() -> new GenreNotFoundException(id)))
                .collect(Collectors.toSet());
        Book book = mappers.toBook(bookRequestDTO);
        book.setGenres(genres);
        book.setEditorial(editorial);
        book = bookRepositry.save(book);
        return mappers.toBookResponseDTO(book);
    }

}
