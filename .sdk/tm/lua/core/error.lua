-- Imgur SDK error

local ImgurError = {}
ImgurError.__index = ImgurError


function ImgurError.new(code, msg, ctx)
  local self = setmetatable({}, ImgurError)
  self.is_sdk_error = true
  self.sdk = "Imgur"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ImgurError:error()
  return self.msg
end


function ImgurError:__tostring()
  return self.msg
end


return ImgurError
