# Use a smaller runtime image
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built JAR file
COPY target/*.jar app.jar

# Expose the app port
EXPOSE 8080

# Run the Spring Boot JAR
ENTRYPOINT ["java", "-jar", "app.jar"]