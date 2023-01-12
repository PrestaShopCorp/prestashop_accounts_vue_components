module "deployments" {
  source    = "git@github.com:PrestaShopCorp/terraform-deployments.git?ref=v2.2.0"
  namespace = "accounts"
  labels    = var.labels

  endpoint_host     = var.ingress_host
  endpoint_name     = var.ingress_name
  static_ip_name    = var.ingress_public_ip_name
  certificates_name = var.ingress_certificate_name

  deploys = [{
    name     = "accounts-storybook"
    strategy = "RollingUpdate"
    endpoint = {
      enable   = true
      external = true
      port     = 80
    }
    esp = {
      enable                   = false
      port                     = 3000
      additionnal_cors_headers = ""
      esp_version              = 2
    }
    secrets = var.secrets
    containers = [{
      name           = "container-name"
      image          = "eu.gcr.io/${var.project}/accounts-vue-components"
      version        = var.app_version
      cpu_request    = "100m"
      cpu_limits     = "250m"
      memory_request = "25Mi"
      memory_limits  = "150Mi"
      port           = 80
      ing_path       = "/*"
    }]
  }]
}