package com.garanto.adapter.rest.dtos;

public record VersionDto(String buildNumber,
                         String buildRevision,
                         String releaseName,
                         String databaseSchemaVersion) {
}
