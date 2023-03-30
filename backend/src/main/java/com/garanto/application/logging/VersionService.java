package com.garanto.application.logging;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.flywaydb.core.Flyway;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class VersionService {
    /*Check if the following config properties are set automatically in the cloud environment! as the are not
    * available in the application.properties*/
    @ConfigProperty(name = "garanto.build.number", defaultValue = "???")
    String buildNumber;

    @ConfigProperty(name = "garanto.build.revision", defaultValue = "???")
    String buildRevision;

    @ConfigProperty(name = "APPSETTING_releaseName", defaultValue = "???")
    String releaseName;

    private final Flyway flyway;

    @Inject
    public VersionService(Flyway flyway) {
        this.flyway = flyway;
    }

    public String getBuildNumber() {
        return buildNumber;
    }

    public String getBuildRevision() {
        return buildRevision;
    }

    public String getReleaseName() {
        return releaseName;
    }

    public String getCombinedVersion() {
        return "build '" +  buildNumber +
                "' revision '" + buildRevision +
                "' release '" + releaseName +
                "' database schema version '" + getDatabaseSchemaVersion() + "'";
    }

    public String getDatabaseSchemaVersion() {
        if(flyway.info() == null){
            return "";
        }
        if(flyway.info().current() == null){
            return "";
        }
        return flyway.info().current().getVersion().getVersion();
    }
}
