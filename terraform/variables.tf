variable "key_name" {
  description = "AWS EC2 key pair name"
  type        = string
  default     = "devops-singapore"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "allowed_ssh_ip" {
  description = "Your public IP for SSH access"
  type        = string
}