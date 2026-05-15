# Imgur SDK exists test

require "minitest/autorun"
require_relative "../Imgur_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ImgurSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
