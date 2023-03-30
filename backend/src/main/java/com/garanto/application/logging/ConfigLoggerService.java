package com.garanto.application.logging;

import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Locale;
import java.util.SortedMap;
import java.util.TreeMap;

@ApplicationScoped
public class ConfigLoggerService {
    private static final Logger LOG = LoggerFactory.getLogger(ConfigLoggerService.class);

    @ConfigProperty(name = "garanto.log-config-at-start", defaultValue = "false")
    boolean logAtStart;

    public void logAtStart() {
        if (!logAtStart) {
            return;
        }
        getAllValues().forEach(this::logValue);
    }

    private SortedMap<String, String> getAllValues() {
        var values = new TreeMap<String, String>();
        var config = ConfigProvider.getConfig();
        config.getPropertyNames().forEach(name -> {
            var configValue = config.getConfigValue(name);
            values.put(configValue.getName(), configValue.getValue());
        });
        return values;
    }

    private void logValue(String name, String value) {
        if (isSensitiveInfo(name) || isSensitiveInfo(value)) {
            LOG.info("config '{}' has value '*** (not shown, sensitive info)'", name);
        } else {
            LOG.info("config '{}' has value '{}'", name, value);
        }
    }

    private boolean isSensitiveInfo(String info) {
        if (info == null) return false;
        var sensitiveWords = List.of("key", "password", "secret", "username", "login", "logon");
        var lowerCaseInfo = info.toLowerCase(Locale.ENGLISH);
        return sensitiveWords.stream().anyMatch(lowerCaseInfo::contains);
    }
}
