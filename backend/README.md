# backend
eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4MjY2OTYwOS0zNGI2LTRiYjAtYmM4OS00NGU5NzBlZjk4MTEifQ.eyJleHAiOjE2ODAzMDE3ODksImlhdCI6MTY4MDIxNTM4OSwianRpIjoiMDE0NDNmZWEtMmIyYS00OTAwLTg4NzQtNmQ1MjBkOTU3MDAxIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDkwL3JlYWxtcy9tYXN0ZXIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwOTAvcmVhbG1zL21hc3RlciIsInR5cCI6IkluaXRpYWxBY2Nlc3NUb2tlbiJ9.48IC8gBlNW7bd9O-hzbuM5K7P4Z_wjdklq6rGd589d0

# more info to improve keycloack
https://www.youtube.com/watch?v=_5a_r7iBC6Q&ab_channel=Tekgainers
https://www.youtube.com/watch?v=FyVHNJNriUQ&ab_channel=VoxxedDaysLuxembourg
https://www.youtube.com/watch?v=tWHdkpVagXA&t=512s&ab_channel=Devoxx
Open a Dev UI available at /q/dev and click on a Provider: Keycloak link in an OpenID Connect Dev UI card. for testing

# Best Practices

Let's start with a quote by Martin Fowler :  
**"Every fool can write code that a computer can understand. Good programmers write code that humans understand."**

Below we describe the best practices adopted.

## Unit Tests

Good Unit Tests are comprehensible to other people, not just machines.
Making code, and in this case Unit Tests, comprehensible to everyone is what we want to call the Art of Unit Testing.

We use the **snake_case** as a naming convention for unit tests (this_is_an_example).

Besides, we follow the unit tests naming strategy :
``should_<expected_behavior>_when_<state_under_test>()``.

Following is how tests in first example would read like if named using this technique:

* should_throw_exception_when_entering_invalid_number()
* should_not_publish_fehlstandsplan_when_it_is_already_published()
* should_drink_coffee_when_feeling_exhausted()

## Quarkus

This project uses Quarkus, the Supersonic Subatomic Java Framework.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```shell script
./gradlew quarkusDev
```

> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at http://localhost:8080/q/dev/.

## Packaging and running the application

The application can be packaged using:
```shell script
./gradlew build
```
It produces the `quarkus-run.jar` file in the `build/quarkus-app/` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `build/quarkus-app/lib/` directory.

The application is now runnable using `java -jar build/quarkus-app/quarkus-run.jar`.

If you want to build an _über-jar_, execute the following command:
```shell script
./gradlew build -Dquarkus.package.type=uber-jar
```

The application, packaged as an _über-jar_, is now runnable using `java -jar build/*-runner.jar`.

## Creating a native executable

You can create a native executable using: 
```shell script
./gradlew build -Dquarkus.package.type=native
```

Or, if you don't have GraalVM installed, you can run the native executable build in a container using: 
```shell script
./gradlew build -Dquarkus.package.type=native -Dquarkus.native.container-build=true
```

You can then execute your native executable with: `./build/backend-1.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/gradle-tooling.

## Provided Code

### RESTEasy Reactive

Easily start your Reactive RESTful Web Services

[Related guide section...](https://quarkus.io/guides/getting-started-reactive#reactive-jax-rs-resources)
