variable "project" {
  type        = string
  description = "GCP Project name"
  default     = "distribution-production-308520"
}

variable "region" {
  type        = string
  description = "Where the cluster will live"
  default     = "europe-west1"
}

variable "default_zone" {
  type        = string
  description = "Belgium zone will be the default zone"
  default     = "europe-west1-c"
}

variable "environment" {
  type        = string
  description = "GCP environment name"
  default     = "production"
}

variable "app_version" {
  type        = string
  description = "Billing app version to deploy"
  default     = "latest"
}

variable "hash_id" {
  type        = string
  description = "Git hash that will be added as label on Kube resources"
  default     = "latest"
}