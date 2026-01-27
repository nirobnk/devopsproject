variable "key_name" {
  description = "AWS EC2 key pair name"
  type        = string
  default     = "devops-singapore"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "c7i-flex.large"
}