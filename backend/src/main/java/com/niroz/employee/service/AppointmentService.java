package com.niroz.employee.service;

import com.niroz.employee.entity.Appointment;
import com.niroz.employee.entity.Doctor;
import com.niroz.employee.entity.User;
import com.niroz.employee.repository.AppointmentRepository;
import com.niroz.employee.repository.DoctorRepository;
import com.niroz.employee.repository.UserRepositary;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepositary userRepositary;

    public Appointment bookAppointment(Appointment appointment){
        // Validate doctor exists
        if (appointment.getDoctor() == null || appointment.getDoctor().getId() == null) {
            throw new IllegalArgumentException("Doctor is required for appointment");
        }
        
        Optional<Doctor> doctorOpt = doctorRepository.findById(appointment.getDoctor().getId());
        if (doctorOpt.isEmpty()) {
            throw new EntityNotFoundException("Doctor not found");
        }
        appointment.setDoctor(doctorOpt.get());
        
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            Optional<User> userOpt = userRepositary.findByEmail(userEmail);
            userOpt.ifPresent(appointment::setUser);
        }
        
        // Set default status if not provided
        if (appointment.getStatus() == null || appointment.getStatus().isEmpty()) {
            appointment.setStatus("Scheduled");
        }
        
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments(){
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            Optional<User> userOpt = userRepositary.findByEmail(userEmail);
            if (userOpt.isPresent()) {
                // Return only appointments belonging to this user
                return appointmentRepository.findByUser(userOpt.get());
            }
        }
        return List.of(); // Return empty list if user not found
    }

    public void deleteAppointment(Long id){
        // Check if appointment exists
        Optional<Appointment> appointmentOpt = appointmentRepository.findById(id);
        if(appointmentOpt.isEmpty()){
            throw new EntityNotFoundException("Appointment with ID "+id+ " Not found");
        }
        
        // Security check: Verify the appointment belongs to the current user
        Appointment appointment = appointmentOpt.get();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            if (appointment.getUser() != null && !appointment.getUser().getEmail().equals(userEmail)) {
                throw new SecurityException("You don't have permission to delete this appointment");
            }
        }
        
        appointmentRepository.deleteById(id);
    }

    public Appointment getAppointmentById(Long id){
        Optional<Appointment> appointmentOpt = appointmentRepository.findById(id);
        if (appointmentOpt.isEmpty()) {
            return null;
        }
        
        // Security check: Verify the appointment belongs to the current user
        Appointment appointment = appointmentOpt.get();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String userEmail = authentication.getName();
            if (appointment.getUser() != null && !appointment.getUser().getEmail().equals(userEmail)) {
                throw new SecurityException("You don't have permission to view this appointment");
            }
        }
        
        return appointment;
    }

    public Appointment updateAppointment(Long id, Appointment appointment){
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(id);
        if(optionalAppointment.isPresent()){
            Appointment existingAppointment = optionalAppointment.get();
            
            // Security check: Verify the appointment belongs to the current user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                String userEmail = authentication.getName();
                if (existingAppointment.getUser() != null && !existingAppointment.getUser().getEmail().equals(userEmail)) {
                    throw new SecurityException("You don't have permission to update this appointment");
                }
            }
            
            existingAppointment.setPatientName(appointment.getPatientName());
            existingAppointment.setPatientEmail(appointment.getPatientEmail());
            existingAppointment.setPatientPhone(appointment.getPatientPhone());
            existingAppointment.setAppointmentDateTime(appointment.getAppointmentDateTime());
            existingAppointment.setReason(appointment.getReason());
            existingAppointment.setStatus(appointment.getStatus());
            
            // Update doctor if provided
            if (appointment.getDoctor() != null && appointment.getDoctor().getId() != null) {
                Optional<Doctor> doctorOpt = doctorRepository.findById(appointment.getDoctor().getId());
                doctorOpt.ifPresent(existingAppointment::setDoctor);
            }
            
            return appointmentRepository.save(existingAppointment);
        }
        return null;
    }
}
