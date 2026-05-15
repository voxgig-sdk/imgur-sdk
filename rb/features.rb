# Imgur SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ImgurFeatures
  def self.make_feature(name)
    case name
    when "base"
      ImgurBaseFeature.new
    when "test"
      ImgurTestFeature.new
    else
      ImgurBaseFeature.new
    end
  end
end
