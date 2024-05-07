package com.anirudhhanda.onestopbackend.registration;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class PasswordValidator {

    // Define your password criteria as regex patterns
    private static final Pattern AT_LEAST_EIGHT_CHARS = Pattern.compile(".{8,}");
    private static final Pattern CONTAINS_DIGIT = Pattern.compile(".*\\d.*");
    private static final Pattern CONTAINS_UPPERCASE = Pattern.compile(".*[A-Z].*");
    private static final Pattern CONTAINS_LOWERCASE = Pattern.compile(".*[a-z].*");
    private static final Pattern CONTAINS_SPECIAL_CHAR = Pattern.compile(".*[!@#$%^&*()-_=+\\|\\[{\\]};:'\",<.>/?`~].*");

    /**
     * Validates a password based on the defined criteria.
     *
     * @param password the password to validate
     * @return true if the password is valid, false otherwise
     */
    public static boolean isValidPassword(String password) {
        return hasMinimumLength(password) &&
                containsDigit(password) &&
                containsUppercase(password) &&
                containsLowercase(password) &&
                containsSpecialChar(password);
    }

    private static boolean hasMinimumLength(String password) {
        return AT_LEAST_EIGHT_CHARS.matcher(password).matches();
    }

    private static boolean containsDigit(String password) {
        return CONTAINS_DIGIT.matcher(password).matches();
    }

    private static boolean containsUppercase(String password) {
        return CONTAINS_UPPERCASE.matcher(password).matches();
    }

    private static boolean containsLowercase(String password) {
        return CONTAINS_LOWERCASE.matcher(password).matches();
    }

    private static boolean containsSpecialChar(String password) {
        return CONTAINS_SPECIAL_CHAR.matcher(password).matches();
    }
}
