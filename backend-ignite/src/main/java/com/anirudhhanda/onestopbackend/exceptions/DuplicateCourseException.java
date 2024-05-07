package com.anirudhhanda.onestopbackend.exceptions;

public class DuplicateCourseException extends Exception{
        public DuplicateCourseException() {
            super();
        }

        public DuplicateCourseException(String message) {
            super(message);
        }

        public DuplicateCourseException(String message, Throwable cause) {
            super(message, cause);
        }

        public DuplicateCourseException(Throwable cause) {
            super(cause);
        }
}
