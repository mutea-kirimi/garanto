package com.garanto.application.logging;

import io.quarkus.runtime.StartupEvent;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;

@ApplicationScoped
public class StartUpService {

    private static final Logger LOG = LoggerFactory.getLogger(StartUpService.class);

    private final ConfigLoggerService configLoggerService;

    private final VersionService versionService;

    @ConfigProperty(name = "garanto.log-config-at-start", defaultValue = "false")
    boolean configLoggingEnabled;

    @Inject
    public StartUpService(ConfigLoggerService configLoggerService,
                          VersionService versionService
                          ) {
        this.configLoggerService = configLoggerService;
        this.versionService = versionService;
    }

    void onStart(@Observes StartupEvent ev) {
        if(configLoggingEnabled){
            try {
                logStartupInfo();
                configLoggerService.logAtStart();
            } catch (Exception e) {
                // we log and re-throw here to not loose some information:
                // the caller, some mysteriously generated startup code from quarkus, only logs the inner cause of the exception
                LOG.error("exception during startup of version {}", versionService.getCombinedVersion(), e);
                throw new IllegalStateException("encountered exception during startup, see log entry above for more information", e);
            }
        }
    }

    private void logStartupInfo() {
        var maxHeapSize = Runtime.getRuntime().maxMemory() / (1024 * 1024);
        LOG.info(String.format("STARTUP INFO: version %s, max heap size %dMBs", versionService.getCombinedVersion(), maxHeapSize));
    }
}

