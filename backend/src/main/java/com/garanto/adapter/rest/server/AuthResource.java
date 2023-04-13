package com.garanto.adapter.rest.server;

import com.garanto.adapter.rest.dtos.UserDto;
import com.garanto.application.user.UserResolver;
import com.garanto.domain.model.Role;
import io.quarkus.logging.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/api/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class AuthResource {
    private static final Logger LOG = LoggerFactory.getLogger(AuthResource.class);

    private final UserResolver userResolver;

    @Inject
    public AuthResource(UserResolver userResolver) {
        this.userResolver = userResolver;
    }

    @GET
    @Path("me")
    @RolesAllowed({Role.USER, Role.ADMIN})
    public UserDto me() {
        Log.info(userResolver.getAllClaimNames());
        return new UserDto(
                userResolver.getUsername(),
                userResolver.getUserRoles(),
                userResolver.getGivenName(),
                userResolver.getFamilyName()
        );
    }
}

