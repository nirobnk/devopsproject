package com.niroz.employee.service;

import com.niroz.employee.entity.Employee;
import com.niroz.employee.entity.User;
import com.niroz.employee.repository.EmployeeRepository;
import com.niroz.employee.repository.UserRepositary;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepositary userRepositary;

    public Employee postEmployee(Employee employee){
        // Simple email validation
        if (employee.getEmail() == null || !employee.getEmail().contains("@")) {
            throw new ValidationException("Invalid email format");
        }
        
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            Optional<User> userOpt = userRepositary.findByEmail(userEmail);
            userOpt.ifPresent(employee::setUser);
        }
        
        return employeeRepository.save(employee);
    }


    public List<Employee> getAllEmployees(){
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            Optional<User> userOpt = userRepositary.findByEmail(userEmail);
            if (userOpt.isPresent()) {
                // Return only employees belonging to this user
                return employeeRepository.findByUser(userOpt.get());
            }
        }
        return List.of(); // Return empty list if user not found
    }

    public void deleteEmployee(Long id){
        // Check if employee exists
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        if(employeeOpt.isEmpty()){
            throw new EntityNotFoundException("Employee with ID "+id+ " Not found");
        }
        
        // Security check: Verify the employee belongs to the current user
        Employee employee = employeeOpt.get();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            if (employee.getUser() != null && !employee.getUser().getEmail().equals(userEmail)) {
                throw new SecurityException("You don't have permission to delete this employee");
            }
        }
        
        employeeRepository.deleteById(id);
    }

    public Employee getEmployeeById(Long id){
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        if (employeeOpt.isEmpty()) {
            return null;
        }
        
        // Security check: Verify the employee belongs to the current user
        Employee employee = employeeOpt.get();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            if (employee.getUser() != null && !employee.getUser().getEmail().equals(userEmail)) {
                throw new SecurityException("You don't have permission to view this employee");
            }
        }
        
        return employee;
    }

    public Employee updateEmployee(Long id,Employee employee){
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if(optionalEmployee.isPresent()){
            Employee existingEmployee = optionalEmployee.get();
            
            // Security check: Verify the employee belongs to the current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                String userEmail = authentication.getName();
                if (existingEmployee.getUser() != null && !existingEmployee.getUser().getEmail().equals(userEmail)) {
                    throw new SecurityException("You don't have permission to update this employee");
                }
            }

            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setName(employee.getName());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setDepartment(employee.getDepartment());

            return employeeRepository.save(existingEmployee);
        }
        return null;
    }
}
