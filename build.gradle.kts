import com.github.benmanes.gradle.versions.reporter.result.*
import com.github.benmanes.gradle.versions.reporter.result.Dependency
import com.github.benmanes.gradle.versions.updates.DependencyUpdatesTask

plugins {
    java
    id ("com.github.ben-manes.versions") version "0.42.0"
}

tasks.register("buildFrontendMain") {
    dependsOn(":frontend:buildFrontend")
}

tasks["jar"].dependsOn("buildFrontendMain")

tasks.withType<DependencyUpdatesTask> {
    outputFormatter = closureOf<Result> {
        kotlin.io.println("--------------------------------")
        kotlin.io.println("gradle dependency updates report")
        kotlin.io.println("--------------------------------")
        kotlin.io.println()
        outdated.print(revision)
        kotlin.io.println()
        undeclared.printAsUndeclared()
        kotlin.io.println()
        unresolved.printAsUnresolved()
    }
}

fun DependenciesGroup<DependencyOutdated>.print(revision: String) {
    val reallyOutdated = filterReallyOutdated()
    if (reallyOutdated.isEmpty()) {
        println("no outdated gradle libraries or plugins found (revision: $revision).")
    } else {
        println("outdated gradle libraries or plugins found (revision: $revision):")
        reallyOutdated.forEach { it.print(revision) }
    }
}

fun DependenciesGroup<DependencyOutdated>.filterReallyOutdated(): List<DependencyOutdated> {
    val falsePositivesCandidates = subprojects
        .single { it.path == ":backend" }
        .property("allDependenciesManagedByQuarkus") as List<*>
    return dependencies.filter { it.id() !in falsePositivesCandidates }
}

fun Dependency.id() = "$group:$name"

fun DependencyOutdated.print(revision: String) {
    val currentVersion = version
    val availableVersion = available.getProperty(revision)
    println("- ${id()} ($currentVersion -> $availableVersion)")
}

fun DependenciesGroup<Dependency>.printAsUndeclared() {
    if (dependencies.isEmpty()) return
    println("Failed to compare versions for the following dependencies because they were declared without version:")
    dependencies.forEach { println("- ${it.id()}") }
}

fun DependenciesGroup<DependencyUnresolved>.printAsUnresolved() {
    if (dependencies.isEmpty()) return
    println("Failed to determine the latest version for the following dependencies:")
    dependencies.forEach { println("- ${it.id()} (failure reason: ${it.reason})") }
}
