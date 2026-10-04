package org.librotech.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import org.librotech.service.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    UserDetailsService userDetailsService;
    JwtService jwtService;

    //Inyecta las dependencias
    public JwtAuthFilter(UserDetailsService userDetailsService, JwtService jwtService) {
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
    }

    //Filtra las peticiones
    public void doFilterInternal(@NotNull HttpServletRequest request,
                                 @NotNull HttpServletResponse response,
                                 @NotNull FilterChain filterChain) throws ServletException, IOException
    {
        final String authHeader = request.getHeader("Authorization");

        // Skip JWT filter for public endpoints
        String path = request.getRequestURI();
        if (path.equals("/api/v1/auth/register") || path.equals("/api/v1/auth/login") ||
                path.equals("/api/auth/forgot-password") || path.equals("/api/auth/reset-password")) {
            filterChain.doFilter(request, response);
            return;
        }

        // No token -> deja pasar la request, el SecurityFilterChain decide si la ruta requiere auth
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);
        final String email;

        try {
            email = jwtService.extractEmail(token);
        } catch (Exception e) {
            // Token malformado o expirado -> deja pasar sin autenticar; quedará como anónimo (401 si la ruta lo exige)
            filterChain.doFilter(request, response);
            return;
        }

        // Solo autentica si aún no hay un usuario autenticado en el contexto
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            if (jwtService.isValid(token, userDetails)) {

                // Autenticación exitosa
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities() //Obtiene los roles del usuario
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); //Añade el detalle de la autenticación
                SecurityContextHolder.getContext().setAuthentication(authToken); //Establece el contexto de autenticación
            }
        }

        filterChain.doFilter(request, response); //Continua con el filtro
    }
}
