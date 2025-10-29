package com.niroz.employee.service;

import com.niroz.employee.entity.Employee;
import com.niroz.employee.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

//    public Employee postEmployee(Employee employee){
//        return employeeRepository.save(employee);
//    }

    public Employee postEmployee(Employee employee){
        // Simple email validation
        if (employee.getEmail() == null || !employee.getEmail().contains("@")) {
            throw new ValidationException("Invalid email format");
        }
        return employeeRepository.save(employee);
    }


    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id){
        if(!employeeRepository.existsById(id)){
            throw new EntityNotFoundException("Employee with ID "+id+ " Not found");
        }else {
            employeeRepository.deleteById(id);
        }
    }

    public Employee getEmployeeById(Long id){
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee updateEmployee(Long id,Employee employee){
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if(optionalEmployee.isPresent()){
            Employee existingEmployee = optionalEmployee.get();

            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setName(employee.getName());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setDepartment(employee.getDepartment());

            return employeeRepository.save(existingEmployee);
        }
        return null;
    }
}
