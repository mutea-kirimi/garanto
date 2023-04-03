package com.garanto.adapter.rest.server;

import com.garanto.application.logging.LogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.ByteArrayInputStream;
import java.time.LocalDateTime;

@Path("/api/logs")
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class LogResource {
    public static final Logger LOG = LoggerFactory.getLogger(LogResource.class);

    private final LogService logService;

    @Inject
    public LogResource(LogService logService) {
        this.logService = logService;
    }

    @GET
    @RolesAllowed("admin")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Transactional
    public Response logs() {
        return Response
                .ok(new ByteArrayInputStream(logService.getLogFileContent()))
                .header("Content-Disposition", "attachment; filename=\"" + "logs_" + LocalDateTime.now() + ".log" + "\"")
                .build();
    }
}
