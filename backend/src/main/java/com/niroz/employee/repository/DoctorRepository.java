package com.niroz.employee.repository;

import com.niroz.employee.entity.Doctor;
import com.niroz.employee.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByUser(User user);
}
