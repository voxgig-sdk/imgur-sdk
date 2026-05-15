package = "voxgig-sdk-imgur"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/imgur-sdk.git"
}
description = {
  summary = "Imgur SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["imgur_sdk"] = "imgur_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
