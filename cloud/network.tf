# https://www.terraform.io/docs/providers/google/r/compute_global_address.html
resource "google_compute_global_address" "storybook" {
  name = "accounts-storybook"
  ip_version = "IPV4"

  description = "storybook-accounts.psessentials.net"
}

# https://www.terraform.io/docs/providers/google/r/dns_record_set.html
resource "google_dns_record_set" "storybook" {
  depends_on = [
    google_compute_global_address.storybook
  ]
  name = "${google_compute_global_address.storybook.description}."
  type = "A"
  ttl = 60

  managed_zone = var.managed_zone

  rrdatas = [
    google_compute_global_address.storybook.address
  ]
}