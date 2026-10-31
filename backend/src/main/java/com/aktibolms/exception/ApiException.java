package com.aktibolms.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiException extends RuntimeException {

    private final String message;
    private final int statusCode;

    public ApiException(String message) {
        this(message, 500);
    }
}
