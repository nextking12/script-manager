FROM openjdk:24-jdk-slim as builder

WORKDIR /app

COPY gradle gradle/
COPY gradlew .
COPY gradlew.bat .
COPY settings.gradle .
COPY build.gradle .

RUN chmod +x gradlew
RUN ./gradlew build -x test --no-daemon || return 0

COPY src src/

RUN ./gradlew clean build -x test --no-daemon

FROM openjdk:24-jdk-slim

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]