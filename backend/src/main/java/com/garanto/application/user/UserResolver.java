package com.garanto.application.user;

import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.jwt.auth.principal.DefaultJWTCallerPrincipal;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Set;

@ApplicationScoped
public class UserResolver {
    private final SecurityIdentity securityIdentity;

    @Inject
    public UserResolver(SecurityIdentity securityIdentity) {
        this.securityIdentity = securityIdentity;
    }

    public DefaultJWTCallerPrincipal getPrincipal(){
        var loggedInUser = (DefaultJWTCallerPrincipal) securityIdentity.getPrincipal();
        return loggedInUser;
    }

    public String getUsername() {
        return getPrincipal().getName();
    }

    public Set<String> getUserRoles(){
        return securityIdentity.getRoles();
    }

    public String getGivenName(){
        return getPrincipal().claim("given_name").orElse("").toString();
    }

    public String getFamilyName(){
        return getPrincipal().claim("family_name").orElse("").toString();
    }

    public Set<String> getAllClaimNames(){
        return getPrincipal().getClaimNames();
    }

}
