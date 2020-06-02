variable "app_version" {
  description = "UI app tag version"
  default = "latest"
}

variable "hash_id" {
  description = "Github hash"
  default     = "latest"
}

variable "managed_zone" {}

variable "gcloud_namespace" {}