package com.niroz.employee.repository;

import com.niroz.employee.entity.Appointment;
import com.niroz.employee.entity.Doctor;
import com.niroz.employee.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser(User user);
    List<Appointment> findByDoctor(Doctor doctor);
}
