# Use Eclipse Temurin instead of deprecated OpenJDK
FROM amazoncorretto:17-alpine

WORKDIR /app

# Copy the JAR file
COPY target/employee-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]