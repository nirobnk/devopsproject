package com.niroz.employee.config;

import com.niroz.employee.entity.Doctor;
import com.niroz.employee.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final DoctorRepository doctorRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if no doctors exist
        if (doctorRepository.count() == 0) {
            Doctor doctor1 = new Doctor();
            doctor1.setName("Sarah Johnson");
            doctor1.setEmail("dr.sarah.johnson@medicalcenter.com");
            doctor1.setPhone("+1-555-0101");
            doctor1.setSpecialization("Cardiologist");
            doctor1.setExperience("15 years");
            doctor1.setAvailability("Mon-Fri, 9:00 AM - 5:00 PM");

            Doctor doctor2 = new Doctor();
            doctor2.setName("Michael Chen");
            doctor2.setEmail("dr.michael.chen@medicalcenter.com");
            doctor2.setPhone("+1-555-0102");
            doctor2.setSpecialization("Pediatrician");
            doctor2.setExperience("12 years");
            doctor2.setAvailability("Mon-Fri, 8:00 AM - 4:00 PM");

            Doctor doctor3 = new Doctor();
            doctor3.setName("Emily Rodriguez");
            doctor3.setEmail("dr.emily.rodriguez@medicalcenter.com");
            doctor3.setPhone("+1-555-0103");
            doctor3.setSpecialization("Dermatologist");
            doctor3.setExperience("10 years");
            doctor3.setAvailability("Mon, Wed, Fri, 10:00 AM - 6:00 PM");

            Doctor doctor4 = new Doctor();
            doctor4.setName("David Thompson");
            doctor4.setEmail("dr.david.thompson@medicalcenter.com");
            doctor4.setPhone("+1-555-0104");
            doctor4.setSpecialization("Orthopedic Surgeon");
            doctor4.setExperience("18 years");
            doctor4.setAvailability("Tue-Thu, 9:00 AM - 5:00 PM");

            Doctor doctor5 = new Doctor();
            doctor5.setName("Priya Patel");
            doctor5.setEmail("dr.priya.patel@medicalcenter.com");
            doctor5.setPhone("+1-555-0105");
            doctor5.setSpecialization("General Practitioner");
            doctor5.setExperience("8 years");
            doctor5.setAvailability("Mon-Sat, 8:00 AM - 6:00 PM");

            Doctor doctor6 = new Doctor();
            doctor6.setName("James Wilson");
            doctor6.setEmail("dr.james.wilson@medicalcenter.com");
            doctor6.setPhone("+1-555-0106");
            doctor6.setSpecialization("Neurologist");
            doctor6.setExperience("20 years");
            doctor6.setAvailability("Mon-Fri, 10:00 AM - 4:00 PM");

            doctorRepository.saveAll(List.of(doctor1, doctor2, doctor3, doctor4, doctor5, doctor6));
            
            System.out.println("✅ Initialized 6 dummy doctors in the database");
        }
    }
}
