package org.librotech.controller;

import org.librotech.Mapper.Mappers;
import org.librotech.dto.ResponseDTOs.UserDTO;
import org.librotech.exception.UserNotFound;
import org.librotech.model.User;
import org.librotech.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/user")
public class UserController {

    private final UserRepository userRepository;
    private final Mappers mappers;

    public UserController(UserRepository userRepository, Mappers mappers) {
        this.userRepository = userRepository;
        this.mappers = mappers;
    }

    @GetMapping()
    public List<UserDTO> findAll() {
        return userRepository.findAll().stream().map(mappers::toUserDTO).toList();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMe(Authentication authentication) {
        //getName is a method of Authentication that returns the subject of the token
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFound("User not found"));
        return ResponseEntity.ok(mappers.toUserDTO(user));
    }
}
