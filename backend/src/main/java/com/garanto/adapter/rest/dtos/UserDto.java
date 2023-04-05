package com.garanto.adapter.rest.dtos;

import java.util.Set;

public record UserDto (
        String name,
        Set<String> roles,
        String givenName,
        String familyName
) {
}
