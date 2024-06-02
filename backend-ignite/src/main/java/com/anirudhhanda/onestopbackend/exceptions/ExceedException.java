package com.anirudhhanda.onestopbackend.exceptions;

public class ExceedException extends Exception{
    public ExceedException() {
        super();
    }

    public ExceedException(String message) {
        super(message);
    }

    public ExceedException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExceedException(Throwable cause) {
        super(cause);
    }
}
