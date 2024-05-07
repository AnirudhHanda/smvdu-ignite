package com.anirudhhanda.onestopbackend.registration;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class NameValidator {

    // Define the pattern for valid names (allows letters, spaces, and hyphens)
    private static final Pattern VALID_NAME_PATTERN = Pattern.compile("^[a-zA-Z]+(?:[-\\s'][a-zA-Z]+)*$");

    /**
     * Validates a name based on the defined pattern.
     *
     * @param name the name to validate
     * @return true if the name is valid, false otherwise
     */
    public static boolean isValidName(String name) {
        return VALID_NAME_PATTERN.matcher(name).matches();
    }
}
