package org.librotech.service;

import org.librotech.Mapper.Mappers;
import org.librotech.dto.RequestDTOs.EditorialRequestDTO;
import org.librotech.dto.ResponseDTOs.EditorialResponseDTO;
import org.librotech.model.Editorial;
import org.librotech.repository.EditorialRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EditorialService {

    private final EditorialRepository editorialRepository;
    private final Mappers mappers;

    public EditorialService(EditorialRepository editorialRepository, Mappers mappers) {
        this.editorialRepository = editorialRepository;
        this.mappers = mappers;
    }

    public Page<EditorialResponseDTO> findAll(Pageable pageable) {
        return editorialRepository.findAll(pageable).map(mappers::toEditorialResponseDTO);
    }

    public EditorialResponseDTO findById(Long id) {
        return mappers.toEditorialResponseDTO(editorialRepository.findById(id).orElseThrow());
    }

    public EditorialResponseDTO save(EditorialRequestDTO editorialRequestDTO){
        Editorial editorial = Editorial.builder()
                .name(editorialRequestDTO.name())
                .build();
        editorial = editorialRepository.save(editorial);
        return mappers.toEditorialResponseDTO(editorial);
    }
}
