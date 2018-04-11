require 'openssl'
require "net/http"
require "uri"
require 'json'

uri = URI.parse("https://hackattic.com/challenges/tales_of_ssl/problem?access_token=8852c35131720e33")

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
request = Net::HTTP::Get.new(uri.request_uri)

response = http.request(request)

body = JSON(response.body)
country = body["required_data"]["country"]
domain = body["required_data"]["domain"]
serial = body["required_data"]["serial_number"]
private_key = body["private_key"]
puts private_key
public_key = OpenSSL::PKey::RSA.new(private_key)
name = OpenSSL::X509::Name.parse "C=#{country}/DC=#{domain}"

cert = OpenSSL::X509::Certificate.new
cert.version = 2
cert.serial = Integer(serial)
cert.not_before = Time.now
cert.not_after = Time.now + 3600

cert.public_key = public_key
cert.subject = name


# POST form request
# require "net/http"
# require "uri"
#
# uri = URI.parse("http://example.com/search")
#
# # Shortcut
# response = Net::HTTP.post_form(uri, {"q" => "My query", "per_page" => "50"})
#
# # Full control
# http = Net::HTTP.new(uri.host, uri.port)
#
# request = Net::HTTP::Post.new(uri.request_uri)
# request.set_form_data({"q" => "My query", "per_page" => "50"})
#
# response = http.request(request)
