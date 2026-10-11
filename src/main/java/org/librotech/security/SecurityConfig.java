package org.librotech.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // importante para que funcione @PreAuthorize
public class SecurityConfig {


    //Crea el codificador BCrypt y lo registra como bean para que Spring pueda inyectarlo donde haga falta.
    //Codifica las contraseñas para guardarlas de forma segura.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //Configura el mecanismo que autentica con usuarios cargados desde tu UserDetailsService y contraseñas verificadas con el codificador.
    //Busca al usuario y verifica su contraseña durante el inicio de sesión.
    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserDetailsService userDetailsService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    //Permite solicitar a Spring que autentique al usuario.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


    // Configura la seguridad de la API v1:
// - Aplica las reglas de seguridad únicamente a las rutas /api/v1/**.
// - Permite el acceso público a los endpoints de autenticación (/api/v1/auth/**).
// - Requiere que el usuario esté autenticado para cualquier otro endpoint de la API.
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, DaoAuthenticationProvider authenticationProvider
    , JwtAuthFilter jwtAuthFilter) throws Exception{
        http
                .securityMatcher("/api/v1/**")
                .authenticationProvider(authenticationProvider) //Usa el proveedor de autenticación DaoAuthenticationProvider
                .csrf(csrf -> csrf.disable()) //Desactiva el filtro CSRF, si no se desactiva, puede ser un problema de seguridad, se debe activar cuando se usan cookies(cuando la sesionse guardan en cookies, el navegador lo asocia a mi dominio y cuando se hace una peticion desde otra pestaña a ese dominio, envia la cookie)
                .authorizeHttpRequests(a -> a
                        .requestMatchers("/api/v1/auth/**").permitAll()//Permite el acceso público a los endpoints de autenticación
                        .requestMatchers("/api/v1/editorials/**").permitAll()
                        .requestMatchers("/api/v1/genres/**").permitAll()
                        .requestMatchers("/api/v1/books/**").permitAll()
                        .requestMatchers("/api/v1/user/**").hasRole("ADMIN") //Requiere que el usuario esté autenticado y tenga el rol ADMIN
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); //Añade el filtro de autenticación JWT
                        //.anyRequest().permitAll());
        return http.build();
    }
}
