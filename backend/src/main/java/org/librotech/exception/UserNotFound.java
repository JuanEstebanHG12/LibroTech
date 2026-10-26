package org.librotech.exception;

public class UserNotFound extends RuntimeException {
    public UserNotFound(String userNotFound) {
        super("User not found");
    }
}
