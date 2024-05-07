package com.anirudhhanda.onestopbackend.exceptions;

    public class DuplicateDepartmentException extends Exception {
        public DuplicateDepartmentException() {
            super();
        }

        public DuplicateDepartmentException(String message) {
            super(message);
        }

        public DuplicateDepartmentException(String message, Throwable cause) {
            super(message, cause);
        }

        public DuplicateDepartmentException(Throwable cause) {
            super(cause);
        }
}
