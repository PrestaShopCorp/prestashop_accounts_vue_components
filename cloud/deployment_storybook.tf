# https://www.terraform.io/docs/providers/kubernetes/r/deployment.html
resource "kubernetes_deployment" "storybook" {
  metadata {
    name = "${terraform.workspace}-storybook"
    namespace = "accounts"

    # kubernetes labels
    labels = {
      "name" = "${terraform.workspace}-storybook"
      "version" = var.app_version
      "managed-by" = "terraform"
    }
  }

  spec {
    replicas = 1

    # wait for previous to be down before launching new one
    strategy {
      type = "Recreate"
    }

    selector {
      match_labels = {
        "name" = "${terraform.workspace}-storybook"
      }
    }

    template {
      # container metadata
      metadata {
        labels = {
          "name" = "${terraform.workspace}-storybook"
          # Use commit to force tf detection
          "version" = var.hash_id
          "managed-by" = "terraform"
        }
      }

      spec {
        # select node pool
        node_selector = {
          type = "accounts"
          env = local.environment
        }

        container {
          name = "ui"
          image = "eu.gcr.io/${local.project}/accounts-vue-components:${var.app_version}"
          image_pull_policy = "Always"

          env {
            name = "Timestamp"
            value = timestamp()
          }
        }
      }
    }
  }
}

# https://www.terraform.io/docs/providers/kubernetes/r/service.html
resource "kubernetes_service" "storybook" {
  metadata {
    name      = "${terraform.workspace}-storybook"
    namespace = "accounts"
    labels = {
      "name"       = "${terraform.workspace}-storybook"
      "part-of"    = "accounts"
      "version"    = var.app_version
      "managed-by" = "terraform"
      "component"  = "ui"
    }
  }

  spec {
    # get client ip
    session_affinity = "ClientIP"
    # Don't expose directly, use the ingress
    type             = "NodePort"
    external_traffic_policy = "Cluster"

    selector = {
      name    = "${terraform.workspace}-storybook"
    }

    port {
      port        = "8081"
      target_port = "80"
      name        = "http-api"
    }
  }
}

resource "google_compute_managed_ssl_certificate" "accounts_storybook" {
  depends_on = [google_dns_record_set.storybook]
  provider = google-beta
  name = "storybook-accounts-distribution"

  managed {
    domains = [ local.url ]
  }
}

# https://www.terraform.io/docs/providers/kubernetes/r/ingress.html
resource "kubernetes_ingress" "storybook" {
  metadata {
    name = "${terraform.workspace}-storybook"
    namespace = "accounts"
    annotations = {
      # Link with created IP address's name
      "kubernetes.io/ingress.global-static-ip-name" = google_compute_global_address.storybook.name
      "ingress.gcp.kubernetes.io/pre-shared-cert"   = google_compute_managed_ssl_certificate.accounts_storybook.name
      # Make the endpoints receive /psx/xxx
      "nginx.ingress.kubernetes.io/rewrite-target" = "/"
      # Don't allow non ssl calls
      "kubernetes.io/ingress.allow-http" = "false"
    }
  }

  spec {
    rule {
      host = google_compute_global_address.storybook.description
      http {
        path {
          backend {
            service_name = "${terraform.workspace}-storybook"
            service_port = kubernetes_service.storybook.spec[0].port[0].port
          }
          path = "/*"
        }
      }
    }
  }
}
