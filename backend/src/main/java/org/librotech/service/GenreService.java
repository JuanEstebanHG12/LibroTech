package org.librotech.service;


import org.librotech.Mapper.Mappers;
import org.librotech.dto.RequestDTOs.GenreRequestDTO;
import org.librotech.dto.ResponseDTOs.GenreResponseDTO;
import org.librotech.model.Genre;
import org.librotech.repository.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {
    private final GenreRepository genreRepository;
    private final Mappers mappers;

    public GenreService(GenreRepository genreRepository, Mappers mappers) {
        this.genreRepository = genreRepository;
        this.mappers = mappers;
    }

    //
    public List<GenreResponseDTO> findAll() {
        return genreRepository.findAll().stream().map(mappers::toGenreResponseDTO).toList();
    }

    public GenreResponseDTO findById(Long id) {
        return mappers.toGenreResponseDTO(genreRepository.findById(id).orElseThrow());
    }

    //Crea un nuevo género
    public GenreResponseDTO save(GenreRequestDTO genreRequestDTO) {
        Genre genre = mappers.toGenre(genreRequestDTO);
        genre = genreRepository.save(genre);
        return mappers.toGenreResponseDTO(genre);
    }
}
