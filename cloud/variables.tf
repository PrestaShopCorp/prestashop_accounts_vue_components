locals {
  project = local.config.project[terraform.workspace]
  managed_zone = local.config.managed_zone[terraform.workspace]
  environment = local.config.environment[terraform.workspace]
  url = local.config.url[terraform.workspace]

  config = {
    project = {
      alpha = "psessentials-integration"
      stable = "psessentials-production"
    }
    managed_zone = {
      alpha   = "psessentials-integration-net"
      stable  = "psessentials-net"
    }
    environment = {
      alpha = "integration"
      stable = "production"
    }
    url = {
      alpha = "storybook-accounts.psessentials-integration.net"
      stable = "storybook-accounts.psessentials.net"
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