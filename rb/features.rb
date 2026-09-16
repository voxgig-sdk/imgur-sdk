# Imgur SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ImgurFeatures
  def self.make_feature(name)
    case name
    when "base"
      ImgurBaseFeature.new
    when "ratelimit"
      ImgurRatelimitFeature.new
    when "retry"
      ImgurRetryFeature.new
    when "test"
      ImgurTestFeature.new
    when "timeout"
      ImgurTimeoutFeature.new
    else
      ImgurBaseFeature.new
    end
  end
end
