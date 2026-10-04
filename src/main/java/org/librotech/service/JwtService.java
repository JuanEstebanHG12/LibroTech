package org.librotech.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.librotech.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
    @Value("${spring.security.jwt.secret}")
    private String secret;

    @Value("${spring.security.jwt.expiration}")
    private Long expiration;

    @Value("${spring.security.jwt.refresh-expiration}")
    private Long refreshExpiration;

    public String generateToken(User user) {
        return buildToken(user, expiration);
    }
    public String generateRefreshToken(User user) {
        return buildToken(user, refreshExpiration);
    }

    private String buildToken(User user, Long expiration) {
        return Jwts.builder()
                .subject(user.getEmail())
                .claims(Map.of("role", user.getRole()))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                //.signWith(SignatureAlgorithm.HS256, secret)
                .signWith(getSignInKey())
                .compact();
    }

    // Genera la llave de firma para el token
    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //Extrae el email del token
    public String extractEmail(String token){
        return getClaims(token).getSubject();
    }

    //Valida el token si el email coincide con el de los detalles del usuario y que no haya expirado
    public boolean isValid(String token, UserDetails userDetails){
        try {
            final String email = extractEmail(token);
            Claims claims = getClaims(token);
            return email.equals(userDetails.getUsername()) && claims.getExpiration().after(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    //Extrae los claims del token
    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSignInKey())
                .build().parseSignedClaims(token)
                .getPayload();
    }

}
