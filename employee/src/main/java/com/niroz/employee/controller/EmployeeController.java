package com.niroz.employee.controller;


import com.niroz.employee.entity.Employee;
import com.niroz.employee.service.EmployeeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/employee")
    public Employee postEmployee(@RequestBody Employee employee){
        return employeeService.postEmployee(employee);
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeService.getAllEmployees();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        try {
            // Call service to delete employee
            employeeService.deleteEmployee(id);

            // Return success message with the deleted ID
            return ResponseEntity.ok("Employee with ID " + id + " deleted successfully");
        } catch (EntityNotFoundException e) {
            // If employee not found, return 404 with message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id){
        Employee employee = employeeService.getEmployeeById(id);
        if (employee == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(employee);
    }

    @PatchMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id,@RequestBody Employee employee){
        Employee updatedEmployee = employeeService.updateEmployee(id,employee);

        if(updatedEmployee == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(updatedEmployee);
    }
}
