package com.niroz.employee.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "phone is required")
    private String phone;

    @NotBlank(message = "Department is required")
    private String department;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true) // foreign key column - nullable for now
    @JsonIgnoreProperties({"employees", "password"}) // Prevent circular reference and hide password
    private User user;
}
