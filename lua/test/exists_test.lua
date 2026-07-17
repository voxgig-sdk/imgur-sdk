-- Imgur SDK exists test

local sdk = require("imgur_sdk")

describe("ImgurSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
