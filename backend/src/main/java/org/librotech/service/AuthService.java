package org.librotech.service;

import org.librotech.Mapper.Mappers;
import org.librotech.dto.RequestDTOs.RegisterRequestDTO;
import org.librotech.dto.ResponseDTOs.TokenResponseDTO;
import org.librotech.dto.RequestDTOs.LoginRequestDTO;
import org.librotech.model.Role;
import org.librotech.model.User;
import org.librotech.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final Mappers mappers;
    private final AuthenticationManager authenticationManager;


    public AuthService(UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder, Mappers mappers, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.mappers = mappers;
        this.authenticationManager = authenticationManager;
    }

    public TokenResponseDTO register(RegisterRequestDTO registerRequest) {

        //Validate user
        if(userRepository.existsByEmail(registerRequest.email()) ){
            throw new RuntimeException("User already exists");
        }

        User user = User.builder()
                .email(registerRequest.email())
                .password(passwordEncoder.encode(registerRequest.password()))
                .name(registerRequest.name())
                .lastName(registerRequest.lastName())
                .role(Role.USER)
                .build();
        user = userRepository.save(user);
        var token = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        return new TokenResponseDTO(token, refreshToken);
    }

    public TokenResponseDTO login(LoginRequestDTO loginRequest) {
        //Validar credenciales usando authenticationManager que usa Bycrypt
        //Valida y si falla lanza BadCredentialsException
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.email(),
                        loginRequest.password()
                )
        );

        //Get user
        User user = userRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new BadCredentialsException("Email o contraseña incorrectos"));

        //Generate tokens
        String token = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new TokenResponseDTO(token, refreshToken);
    }
}
