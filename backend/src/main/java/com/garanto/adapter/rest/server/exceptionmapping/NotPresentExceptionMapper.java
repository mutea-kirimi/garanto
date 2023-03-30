package com.garanto.adapter.rest.server.exceptionmapping;

import com.garanto.domain.exceptions.NotPresentException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class NotPresentExceptionMapper implements ExceptionMapper<NotPresentException> {

    @Override
    public Response toResponse(NotPresentException exception) {
        return Response.status(Response.Status.NOT_FOUND)
                .entity(exception.getMessage())
                .build();
    }
}
