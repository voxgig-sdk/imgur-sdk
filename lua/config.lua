-- Imgur SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Imgur",
      slug = "imgur",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://imgur.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["image"] = {},
        ["post_meta"] = {},
      },
    },
    entity = {
      ["image"] = {
        ["fields"] = {
          {
            ["format"] = "date-time",
            ["name"] = "created_at",
            ["short"] = "Image upload timestamp",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "Image description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "height",
            ["short"] = "Image height in pixels",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["short"] = "Image ID",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "size",
            ["short"] = "File size in bytes",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "title",
            ["short"] = "Image title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["short"] = "MIME type of the image",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "url",
            ["short"] = "Direct URL to the image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "views",
            ["short"] = "Number of views",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "width",
            ["short"] = "Image width in pixels",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "image",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "image_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/images/{imageId}",
                ["rename"] = {
                  ["param"] = {
                    ["imageId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "images",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "images",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["post_meta"] = {
        ["fields"] = {
          {
            ["name"] = "count",
            ["short"] = "Number of accolades of this type",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["short"] = "Accolade type",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "post_meta",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "RUjYvXN",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "post_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "post,user,accolades",
                      ["kind"] = "query",
                      ["name"] = "include",
                      ["orig"] = "include",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/post/{postId}/meta",
                ["rename"] = {
                  ["param"] = {
                    ["postId"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "post",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "meta",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "include",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "post",
                  "{id}",
                  "meta",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
