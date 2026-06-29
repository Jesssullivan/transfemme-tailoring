# OpenTofu state backend.
#
# State lives in an S3-compatible bucket served by the cluster's Garage
# (or MinIO) deployment. Hard invariant from docs/CI-SCHEMA.md §5:
# state is NEVER served by rustfs.
#
# Backend init may need credentials passed via tofu init -backend-config=...
# or AWS_* env vars. See tofu/README.md.

terraform {
  backend "s3" {
    bucket = "tofu-state"
    key    = "spokes/site-scaffold/terraform.tfstate"
    region = "us-east-1" # provider-required; Garage ignores

    endpoints = {
      s3 = "https://garage.nix-cache.svc.cluster.local"
    }

    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    use_path_style              = true
  }
}
