package com.garanto.domain.exceptions;

import java.io.Serial;

public class UnexpectedFailureException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 2220633403620015539L;

    public UnexpectedFailureException(Throwable e) {
        super(e);
    }
}
