package org.librotech.controller;

import jakarta.validation.Valid;
import org.librotech.dto.RequestDTOs.BookRequestDTO;
import org.librotech.dto.ResponseDTOs.BookResponseDTO;
import org.librotech.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<Page<BookResponseDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(bookService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.findById(id));
    }

    @PostMapping
    public ResponseEntity<BookResponseDTO> save(@Valid @RequestBody BookRequestDTO bookRequestDTO) {
        return ResponseEntity.ok(bookService.save(bookRequestDTO));
    }
}
