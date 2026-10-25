package org.librotech.controller;

import jakarta.validation.Valid;
import org.librotech.dto.RequestDTOs.LoginRequestDTO;
import org.librotech.dto.RequestDTOs.RegisterRequestDTO;
import org.librotech.dto.ResponseDTOs.TokenResponseDTO;
import org.librotech.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        return ResponseEntity.ok(authService.login(loginRequestDTO));
    }

    @PostMapping("/register")
    public ResponseEntity<TokenResponseDTO> register(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        return ResponseEntity.ok(authService.register(registerRequestDTO));
    }

//    @PostMapping("/refresh-token")
//    public ResponseEntity<String> refreshToken() {
//        return ResponseEntity.ok("Refresh token successful");
//    }
//
//    @PostMapping("/logout")
//    public ResponseEntity<String> logout() {
//        return ResponseEntity.ok("Logout successful");
//    }
}
