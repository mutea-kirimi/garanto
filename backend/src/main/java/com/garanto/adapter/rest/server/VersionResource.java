package com.garanto.adapter.rest.server;

import com.garanto.adapter.rest.dtos.VersionDto;
import com.garanto.application.logging.VersionService;

import javax.annotation.security.PermitAll;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/api/version")
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class VersionResource {

    private final VersionService versionService;

    @Inject
    public VersionResource(VersionService versionService) {
        this.versionService = versionService;
    }

    @GET
    @PermitAll
    public VersionDto getVersion() {
        var buildNumber = versionService.getBuildNumber();
        var buildRevision = versionService.getBuildRevision();
        var releaseName = versionService.getReleaseName();
        var databaseSchemaVersion = versionService.getDatabaseSchemaVersion();
        return new VersionDto(buildNumber, buildRevision, releaseName, databaseSchemaVersion);
    }
}

