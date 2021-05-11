locals {
  project = local.config.project[terraform.workspace]
  managed_zone = local.config.managed_zone[terraform.workspace]
  environment = local.config.environment[terraform.workspace]
  url = local.config.url[terraform.workspace]

  config = {
    project = {
      alpha = "distribution-integration"
      stable  = "distribution-production-308520"
    }
    managed_zone = {
      alpha = "distribution-integration-net"
      stable = "distribution-integration-net"
    }
    environment = {
      alpha = "integration"
      stable = "production"
    }
    url = {
      alpha = "storybook-accounts.distribution-integration.prestashop.net"
      stable = "storybook-accounts.distribution.prestashop.net"
    }
  }
}

variable "app_version" {
  description = "UI app tag version"
  default = "latest"
}

variable "hash_id" {
  description = "Github hash"
  default     = "latest"
}
