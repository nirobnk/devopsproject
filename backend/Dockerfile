# Use an OpenJDK image as base
#FROM openjdk:17-jdk-slim

# Set working directory inside container


# Copy the Spring Boot JAR into the container
#ADD target/employee-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the Spring Boot app runs on (default 8080)
#EXPOSE 8080

# Command to run the JAR
#ENTRYPOINT ["java", "-jar", "/app.jar"]


# Use a compatible OpenJDK image
FROM openjdk:17-jdk

# Set working directory
WORKDIR /app

# Copy the Spring Boot JAR into the container
COPY target/employee-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot JAR
ENTRYPOINT ["java", "-jar", "app.jar"]