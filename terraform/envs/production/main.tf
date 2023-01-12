locals {
  labels = {
    project     = "accounts-storybook"
    tribe       = "extensions"
    squad       = "accounts"
    environment = var.environment
    github_hash = var.hash_id

  }
}


module "storybook" {
  source = "../../modules/storybook"

  project     = var.project
  app_version = var.app_version
  labels      = local.labels

  secrets = []

  ingress_name             = "stable-storybook"
  ingress_public_ip_name   = "accounts-storybook"
  ingress_host             = "storybook-accounts.distribution.prestashop.net"
  ingress_certificate_name = "storybook-accounts-distribution"

}