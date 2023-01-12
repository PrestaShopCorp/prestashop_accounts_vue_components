terraform {
  backend "gcs" {
    prefix = "app-accounts-storybook"
    bucket = "terraform-distribution-production"
  }
}