package org.librotech.exception;

public class GenreNotFoundException extends RuntimeException {
    public GenreNotFoundException(Long id) {
        super("Genre not found " +id );
    }
}
