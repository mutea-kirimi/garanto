package com.garanto.domain.exceptions;

import java.io.Serial;

public class NotPresentException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 9078355261602379520L;

    public NotPresentException() {
        super();
    }

    public NotPresentException(String s) {
        super(s);
    }
}
