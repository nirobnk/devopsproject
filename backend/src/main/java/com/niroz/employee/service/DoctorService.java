package com.niroz.employee.service;

import com.niroz.employee.entity.Doctor;
import com.niroz.employee.entity.User;
import com.niroz.employee.repository.DoctorRepository;
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
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final UserRepositary userRepositary;

    public Doctor postDoctor(Doctor doctor){
        // Simple email validation
        if (doctor.getEmail() == null || !doctor.getEmail().contains("@")) {
            throw new ValidationException("Invalid email format");
        }
        
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            Optional<User> userOpt = userRepositary.findByEmail(userEmail);
            userOpt.ifPresent(doctor::setUser);
        }
        
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors(){
        // Return all doctors for browsing
        return doctorRepository.findAll();
    }

    public void deleteDoctor(Long id){
        // Check if doctor exists
        Optional<Doctor> doctorOpt = doctorRepository.findById(id);
        if(doctorOpt.isEmpty()){
            throw new EntityNotFoundException("Doctor with ID "+id+ " Not found");
        }
        
        // Security check: Verify the doctor belongs to the current user
        Doctor doctor = doctorOpt.get();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            if (doctor.getUser() != null && !doctor.getUser().getEmail().equals(userEmail)) {
                throw new SecurityException("You don't have permission to delete this doctor");
            }
        }
        
        doctorRepository.deleteById(id);
    }

    public Doctor getDoctorById(Long id){
        Optional<Doctor> doctorOpt = doctorRepository.findById(id);
        return doctorOpt.orElse(null);
    }

    public Doctor updateDoctor(Long id, Doctor doctor){
        Optional<Doctor> optionalDoctor = doctorRepository.findById(id);
        if(optionalDoctor.isPresent()){
            Doctor existingDoctor = optionalDoctor.get();
            
            // Security check: Verify the doctor belongs to the current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                String userEmail = authentication.getName();
                if (existingDoctor.getUser() != null && !existingDoctor.getUser().getEmail().equals(userEmail)) {
                    throw new SecurityException("You don't have permission to update this doctor");
                }
            }
            
            existingDoctor.setName(doctor.getName());
            existingDoctor.setEmail(doctor.getEmail());
            existingDoctor.setPhone(doctor.getPhone());
            existingDoctor.setSpecialization(doctor.getSpecialization());
            existingDoctor.setExperience(doctor.getExperience());
            existingDoctor.setAvailability(doctor.getAvailability());
            
            return doctorRepository.save(existingDoctor);
        }
        return null;
    }
}
