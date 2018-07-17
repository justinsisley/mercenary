variable "cloudflare_email" {}

variable "cloudflare_token" {}

variable "aws_access_key" {}

variable "aws_secret_key" {}

variable "aws_region" {
  default = "us-east-1"
}

# https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts.platforms.html#concepts.platforms.docker
variable "solution_stack_name" {
  default = "64bit Amazon Linux 2018.03 v2.11.0 running Docker 18.03.1-ce"
}

variable "app_name" {
  default = "mercenary"
}

variable "env_name" {
  default = "mercenary-dot-io"
}

variable "domain" {
  default = "mercenary.io"
}

variable "dns_ttl" {
  default = 120
}

# Configure the AWS Provider
provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "${var.aws_region}"
}

# Configure the Cloudflare provider
provider "cloudflare" {
  email = "${var.cloudflare_email}"
  token = "${var.cloudflare_token}"
}

# Request a certificate for the domain
resource "aws_acm_certificate" "cert" {
  domain_name               = "${var.domain}"
  subject_alternative_names = ["www.${var.domain}"]
  validation_method         = "DNS"
}

# Add non-www CNAME record for certificate
resource "cloudflare_record" "cert_non_www" {
  domain = "${var.domain}"
  name   = "${lookup(aws_acm_certificate.cert.domain_validation_options[0], "resource_record_name")}"
  value  = "${lookup(aws_acm_certificate.cert.domain_validation_options[0], "resource_record_value")}"
  type   = "CNAME"
  ttl    = "${var.dns_ttl}"
}

# Add www CNAME record for certificate
resource "cloudflare_record" "cert_www" {
  domain = "${var.domain}"
  name   = "${lookup(aws_acm_certificate.cert.domain_validation_options[1], "resource_record_name")}"
  value  = "${lookup(aws_acm_certificate.cert.domain_validation_options[1], "resource_record_value")}"
  type   = "CNAME"
  ttl    = "${var.dns_ttl}"
}

# Wait for certificate validation to complete
resource "aws_acm_certificate_validation" "cert" {
  certificate_arn = "${aws_acm_certificate.cert.arn}"
}

# Set up SES to allow emails to be sent from this domain
resource "aws_ses_domain_identity" "app" {
  domain = "${var.domain}"
}

# Configure SES DKIM
resource "aws_ses_domain_dkim" "app" {
  domain = "${var.domain}"
}

# Add TXT record for SES
resource "cloudflare_record" "ses_txt" {
  domain = "${var.domain}"
  name   = "_amazonses.${var.domain}"
  value  = "${aws_ses_domain_identity.app.verification_token}"
  type   = "TXT"
  ttl    = "${var.dns_ttl}"
}

# Add DKIM CNAME records for SES
resource "cloudflare_record" "ses_cname" {
  count  = 3
  domain = "${var.domain}"
  name   = "${element(aws_ses_domain_dkim.app.dkim_tokens, count.index)}._domainkey.${var.domain}"
  value  = "${element(aws_ses_domain_dkim.app.dkim_tokens, count.index)}.dkim.amazonses.com"
  type   = "CNAME"
  ttl    = "${var.dns_ttl}"
}

# Wait for SES domain validation to complete
resource "aws_ses_domain_identity_verification" "app" {
  domain     = "${aws_ses_domain_identity.app.id}"
  depends_on = ["cloudflare_record.ses_cname"]
}

# Set up the Elastic Beanstalk application
resource "aws_elastic_beanstalk_application" "app" {
  name = "${var.app_name}"
}

# Set up the Elastic Beanstalk environment
resource "aws_elastic_beanstalk_environment" "env" {
  name                = "${var.env_name}"
  application         = "${var.app_name}"
  solution_stack_name = "${var.solution_stack_name}"

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = "1"
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = "1"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t2.micro"
  }

  setting {
    namespace = "aws:autoscaling:updatepolicy:rollingupdate"
    name      = "MaxBatchSize"
    value     = "1"
  }

  setting {
    namespace = "aws:autoscaling:updatepolicy:rollingupdate"
    name      = "MinInstancesInService"
    value     = "1"
  }

  setting {
    namespace = "aws:elb:listener:443"
    name      = "ListenerProtocol"
    value     = "HTTPS"
  }

  setting {
    namespace = "aws:elb:listener:443"
    name      = "InstancePort"
    value     = "443"
  }

  setting {
    namespace = "aws:elb:listener:443"
    name      = "InstanceProtocol"
    value     = "HTTPS"
  }

  setting {
    namespace = "aws:elb:listener:443"
    name      = "SSLCertificateId"
    value     = "${aws_acm_certificate_validation.cert.certificate_arn}"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "NETDATA_USERNAME"
    value     = "CHANGE_THIS_VALUE"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "NETDATA_PASSWORD"
    value     = "CHANGE_THIS_VALUE"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "MLAB_USERNAME"
    value     = "CHANGE_THIS_VALUE"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "MLAB_PASSWORD"
    value     = "CHANGE_THIS_VALUE"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "MLAB_SERVER"
    value     = "CHANGE_THIS_VALUE"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "DOMAIN"
    value     = "https://www.${var.domain}"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "JWT_SECRET"
    value     = "CHANGE_THIS_VALUE"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "EMAIL_FROM_ADDRESS"
    value     = "Hello <hello@${var.domain}>"
  }
}

# Set up S3 bucket to upload new builds into
resource "aws_s3_bucket" "app" {
  bucket = "${var.app_name}-builds"
  acl    = "private"
}

# Get information about the load balancer created by Elastic Beanstalk
data "aws_elb" "env" {
  name = "${aws_elastic_beanstalk_environment.env.load_balancers[0]}"
}

# Add www record to the domain
resource "cloudflare_record" "www" {
  domain  = "${var.domain}"
  name    = "www"
  value   = "${data.aws_elb.env.dns_name}"
  type    = "CNAME"
  ttl     = "${var.dns_ttl}"
  proxied = true
}

# Add non-www record to the domain
resource "cloudflare_record" "non_www" {
  domain  = "${var.domain}"
  name    = "@"
  value   = "${data.aws_elb.env.dns_name}"
  type    = "CNAME"
  ttl     = "${var.dns_ttl}"
  proxied = true
}

# Add rule to force HTTPS for non-www
resource "cloudflare_page_rule" "https_non_www" {
  zone     = "${var.domain}"
  target   = "http://${var.domain}/*"
  priority = 1

  actions = {
    always_use_https = true
  }
}

# Add rule to force HTTPS for www
resource "cloudflare_page_rule" "https_www" {
  zone     = "${var.domain}"
  target   = "http://www.${var.domain}/*"
  priority = 2

  actions = {
    always_use_https = true
  }
}

# Add rule to redirect from non-www to www (all HTTPS)
resource "cloudflare_page_rule" "www" {
  zone     = "${var.domain}"
  target   = "https://${var.domain}/*"
  priority = 3

  actions = {
    forwarding_url = {
      url         = "https://www.${var.domain}/$1"
      status_code = "301"
    }
  }
}
