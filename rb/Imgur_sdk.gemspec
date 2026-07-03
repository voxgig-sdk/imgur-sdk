Gem::Specification.new do |spec|
  spec.name          = "voxgig-sdk-imgur"
  spec.version       = "0.0.1"
  spec.authors       = ["Voxgig"]
  spec.summary       = "Imgur SDK for Ruby"
  spec.license       = "MIT"
  spec.homepage      = "https://github.com/voxgig-sdk/imgur-sdk"

  spec.files         = Dir["lib/**/*.rb", "*.rb"]
  spec.require_paths = ["."]

  spec.required_ruby_version = ">= 3.0"
  spec.add_dependency "json", "~> 0"
  spec.add_dependency "voxgig-struct", "~> 0.0.10"

  spec.add_development_dependency "minitest", "~> 5.0"
  spec.add_development_dependency "rake", "~> 13.0"
end
