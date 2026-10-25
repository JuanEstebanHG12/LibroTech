package org.librotech.controller;

import org.librotech.Mapper.Mappers;
import org.librotech.dto.ResponseDTOs.UserDTO;
import org.librotech.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
