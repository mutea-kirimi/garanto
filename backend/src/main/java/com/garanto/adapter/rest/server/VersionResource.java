package com.garanto.adapter.rest.server;

import com.garanto.adapter.rest.dtos.VersionDto;
import com.garanto.application.logging.VersionService;
import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.jwt.auth.principal.DefaultJWTCallerPrincipal;

import javax.annotation.security.RolesAllowed;
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
    private final SecurityIdentity securityIdentity;

    @Inject
    public VersionResource(VersionService versionService, SecurityIdentity securityIdentity) {
        this.versionService = versionService;
        this.securityIdentity = securityIdentity;
    }

    @GET
    @RolesAllowed("user")
    public VersionDto getVersion() {
        System.out.println(securityIdentity.getPrincipal());
        var principal = (DefaultJWTCallerPrincipal) securityIdentity.getPrincipal();
        System.out.println(principal.getClaimNames());
        System.out.println(principal.claim("given_name").get());
        System.out.println(principal.claim("family_name").get());




        var buildNumber = versionService.getBuildNumber();
        var buildRevision = versionService.getBuildRevision();
        var releaseName = versionService.getReleaseName();
        var databaseSchemaVersion = versionService.getDatabaseSchemaVersion();
        return new VersionDto(buildNumber, buildRevision, releaseName, databaseSchemaVersion);
    }
}

