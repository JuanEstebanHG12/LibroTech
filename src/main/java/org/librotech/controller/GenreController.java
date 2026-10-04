package org.librotech.controller;

import org.librotech.dto.RequestDTOs.GenreRequestDTO;
import org.librotech.dto.ResponseDTOs.GenreResponseDTO;
import org.librotech.service.GenreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/genres")
public class GenreController {

    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping
    public List<GenreResponseDTO> findAll() {
        return genreService.findAll();
    }

    @GetMapping("/{id}")
    public GenreResponseDTO findById(@PathVariable Long id) {
        return genreService.findById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") //Solo los usuarios con rol ADMIN pueden crear géneros
    public ResponseEntity<Void> save(@RequestBody GenreRequestDTO genreRequestDTO) {
        genreService.save(genreRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
