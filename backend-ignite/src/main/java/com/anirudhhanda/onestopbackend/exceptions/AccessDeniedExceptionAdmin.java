package com.anirudhhanda.onestopbackend.exceptions;

public class AccessDeniedExceptionAdmin extends Exception{
    public AccessDeniedExceptionAdmin() {
        super();
    }

    public AccessDeniedExceptionAdmin(String message) {
        super(message);
    }

    public AccessDeniedExceptionAdmin(String message, Throwable cause) {
        super(message, cause);
    }

    public AccessDeniedExceptionAdmin(Throwable cause) {
        super(cause);
    }
}
