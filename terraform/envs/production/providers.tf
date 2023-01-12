terraform {
  required_version = ">=1.1.7"
  required_providers {
    google      = "~>4.15.0"
    kubernetes  = "~>2.10.0"
    google-beta = "~>4.15.0"
  }
}

provider "google" {
  project = var.project
  region  = var.region
  zone    = var.default_zone
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "gke_distribution-production-308520_europe-west1-c_distribution"
}

provider "google-beta" {
  project = var.project
  region  = var.region
  zone    = var.default_zone
}