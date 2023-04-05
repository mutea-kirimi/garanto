package com.garanto.adapter.rest.server;


import com.garanto.adapter.rest.dtos.UserDto;
import com.garanto.domain.exceptions.NotPresentException;
import com.garanto.domain.model.Role;
import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.jwt.auth.principal.DefaultJWTCallerPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.time.LocalDateTime;

@Path("/api/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class AuthResource {
    private static final Logger LOG = LoggerFactory.getLogger(AuthResource.class);

    private final SecurityIdentity securityIdentity;

    @Inject
    public AuthResource(SecurityIdentity securityIdentity) {
        this.securityIdentity = securityIdentity;
    }

    @GET
    @Path("login")
    public UserDto login(@Context SecurityContext ctx) {
        return null;
    }

    @GET
    @Path("url")
    @PermitAll
    public String getAuthenticationUrl() {
        return null;
    }

    @GET
    @Path("me")
    @RolesAllowed({Role.USER, Role.ADMIN})
    public UserDto me() {
        var loggedInUser = securityIdentity.getPrincipal();
        var roles = securityIdentity.getRoles();
        if (loggedInUser == null || roles.isEmpty()) {
            throw new NotPresentException();
        }
        return new UserDto(loggedInUser.getName(), roles, "x", "y");
    }

    @GET
    @Path("logout")
    @PermitAll
    public Response logout(@Context SecurityContext ctx) {
        return Response.status(Response.Status.UNAUTHORIZED)
                .header("logged_out", LocalDateTime.now().toString())
                .build();
    }
}

