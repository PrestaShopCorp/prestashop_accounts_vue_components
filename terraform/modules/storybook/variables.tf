variable "project" {
  type        = string
  description = "GCP project name that will host storybook"
}

variable "labels" {
  type        = map(string)
  description = "Labels that will be applied on Kube ressources"
}

variable "ingress_name" {
  type        = string
  description = "Kube ingress name"
}

variable "ingress_host" {
  type        = string
  description = "Host that will match ingress"
}

variable "ingress_public_ip_name" {
  type        = string
  description = "GCP public IP name that will be bind on Kube ingress"
}

variable "ingress_certificate_name" {
  type        = string
  description = "GCP managed certificate name that will be bind on Kube ingress to serve HTTPS traffic"
}

variable "app_version" {
  type        = string
  description = "Docker image tag that will be deployed"
}

variable "secrets" {
  type        = list(string)
  description = "Kube secrets names that will be injected as environment variables on Storybook pods"
}