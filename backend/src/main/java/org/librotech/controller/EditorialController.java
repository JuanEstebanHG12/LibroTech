package org.librotech.controller;

import jakarta.validation.Valid;
import org.librotech.dto.RequestDTOs.EditorialRequestDTO;
import org.librotech.dto.ResponseDTOs.EditorialResponseDTO;
import org.librotech.service.EditorialService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/editorials")
public class EditorialController {

    private final EditorialService editorialService;

    public EditorialController(EditorialService editorialService) {
        this.editorialService = editorialService;
    }

    @GetMapping
    public ResponseEntity<Page<EditorialResponseDTO>> findAll(Pageable pageable) {
        return ResponseEntity.ok(editorialService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EditorialResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(editorialService.findById(id));
    }

    @PostMapping
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EditorialResponseDTO> save(@Valid @RequestBody EditorialRequestDTO editorialRequestDTO) {
        EditorialResponseDTO created = editorialService.save(editorialRequestDTO);

        //Segun RFC 7231, la respuesta debe contener el URI del recurso creado
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(created.id()) // Requiere que tu DTO tenga el id
            .toUri();
       return ResponseEntity.created(location).body(created);
    }

}
