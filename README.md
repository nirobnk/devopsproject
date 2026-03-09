# 🚀 End-to-End DevOps CI/CD Pipeline on AWS

This project demonstrates a **complete DevOps CI/CD pipeline implementation** for deploying a **containerized full-stack application** on **AWS EC2** using modern DevOps tools.

The pipeline automates the entire workflow from **code commit to application deployment**, ensuring faster, reliable, and repeatable deployments.

It integrates **Docker, Jenkins, Ansible, Terraform, and AWS** to build a production-style DevOps environment.

---

# 📌 Project Overview

This project automates the deployment of a **full-stack application consisting of:**

- React Frontend
- Spring Boot Backend
- MySQL Database

The entire infrastructure and deployment process is automated using **Infrastructure as Code and CI/CD practices**.

---

# 🧰 Tech Stack

| Category | Technology |
|--------|--------|
| Frontend | React |
| Backend | Spring Boot |
| Database | MySQL |
| CI/CD | Jenkins |
| Containerization | Docker |
| Image Registry | DockerHub |
| Configuration Management | Ansible |
| Infrastructure as Code | Terraform |
| Cloud Platform | AWS EC2 |
| Version Control | GitHub |

---

# 🏗 Architecture

The project uses **two EC2 instances** to separate CI infrastructure from application infrastructure.

            Developer
                │
                ▼
            GitHub Repo
                │
                ▼
            Jenkins Server
           (EC2 Instance)
                │
    Build Docker Images
                │
                ▼
           DockerHub
                │
                ▼
          Ansible Playbook
                │
                ▼
       Application Server (EC2)
    ┌─────────────┬─────────────┐
    │ React       │ Spring Boot │
    │ Frontend    │ Backend     │
    └─────────────┴─────────────┘
                │
                ▼
             MySQL


---

# ⚙️ Infrastructure Provisioning (Terraform)

Terraform is used to **automatically provision AWS infrastructure**, including:

- Jenkins EC2 Instance
- Application Server EC2 Instance
- Security Groups
- Networking configuration

This enables **repeatable and version-controlled infrastructure deployment**.

---

# 🔄 CI/CD Pipeline Workflow

The pipeline automates the full deployment lifecycle.

### 1️⃣ Code Commit

Developers push code to the **GitHub repository**.

### 2️⃣ Jenkins Pipeline Trigger

Jenkins automatically triggers the pipeline when new code is pushed.

### 3️⃣ Build Docker Images

Jenkins builds Docker images for:

- React frontend
- Spring Boot backend
- MySQL database

### 4️⃣ Push Images to DockerHub

The images are pushed to **DockerHub** as the container registry.

### 5️⃣ Configuration Management with Ansible

Jenkins triggers an **Ansible playbook**.

### 6️⃣ Remote Deployment

Ansible connects to the **Application Server via SSH**.

### 7️⃣ Pull Docker Images

The App Server pulls the latest Docker images from **DockerHub**.

### 8️⃣ Run Containers

Containers for:

- Frontend
- Backend
- Database

are deployed automatically using Docker.

---

# 🐳 Dockerized Application

Each service runs inside a separate Docker container.

Services include:

- **Frontend Container (React)**
- **Backend Container (Spring Boot)**
- **Database Container (MySQL)**

Benefits of containerization:

- Consistent environments
- Faster deployments
- Simplified scaling

---
