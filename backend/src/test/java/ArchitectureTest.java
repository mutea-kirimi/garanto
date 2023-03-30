import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;
import com.tngtech.archunit.library.GeneralCodingRules;
import io.quarkus.runtime.Application;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;
import static com.tngtech.archunit.library.Architectures.onionArchitecture;

@AnalyzeClasses(
        packages = "com.garanto",
        importOptions = {ImportOption.DoNotIncludeTests.class}
)
public class ArchitectureTest {

    @ArchTest
    public static final ArchRule zwiebelschichtenWerdenEingehalten = onionArchitecture()
            .domainServices("com.garanto.domain..")
            .applicationServices("com.garanto.application..")
            .adapter("rest", "com.garanto.adapter.rest..")
            .withOptionalLayers(true);

    @ArchTest
    public static final ArchRule webservicesWerdenNurAlsAdapterVerwendet = noClasses().that()
            .resideOutsideOfPackage("com.daimler.ipas.adapter.rest..")
            .and().areNotAssignableTo(Application.class)
            .should().dependOnClassesThat().resideInAnyPackage("javax.ws.rs..", "org.jboss.resteasy..");

    @ArchTest
    public static final ArchRule unprofessionellesLoggingWirdNichtBenutzt = GeneralCodingRules.NO_CLASSES_SHOULD_ACCESS_STANDARD_STREAMS;

    @ArchTest
    public static final ArchRule standardLoggingWirdNichtBenutzt = GeneralCodingRules.NO_CLASSES_SHOULD_USE_JAVA_UTIL_LOGGING;

    @ArchTest
    public static final ArchRule exceptionsWerdenSpezifischGeworfen = GeneralCodingRules.NO_CLASSES_SHOULD_THROW_GENERIC_EXCEPTIONS;

    @ArchTest
    public static final ArchRule veraltetesJodaTimeWirdNichtBenutzt = GeneralCodingRules.NO_CLASSES_SHOULD_USE_JODATIME;

    @ArchTest
    public static final ArchRule fieldInjectionWirdNichtBenutzt = GeneralCodingRules.NO_CLASSES_SHOULD_USE_FIELD_INJECTION;
}

