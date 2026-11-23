package com.aktibolms.backend.exception;

/**
 * Thrown when a requested resource (e.g. student or instructor) is not found in the database.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
