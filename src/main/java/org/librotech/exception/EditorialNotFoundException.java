package org.librotech.exception;

import jakarta.validation.constraints.NotNull;

public class EditorialNotFoundException extends RuntimeException {
    public EditorialNotFoundException(@NotNull(message = "Editorial ID cannot be null") Long aLong) {
        super("Editorial not found " + aLong);
    }
}
