# Imgur SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Imgur",
            "slug": "imgur",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://imgur.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "image": {},
                "post_meta": {},
            },
        },
        "entity": {
      "image": {
        "fields": [
          {
            "format": "date-time",
            "name": "created_at",
            "short": "Image upload timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Image description",
            "type": "`$STRING`",
          },
          {
            "name": "height",
            "short": "Image height in pixels",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "short": "Image ID",
            "type": "`$STRING`",
          },
          {
            "name": "size",
            "short": "File size in bytes",
            "type": "`$INTEGER`",
          },
          {
            "name": "title",
            "short": "Image title",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "MIME type of the image",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "short": "Direct URL to the image",
            "type": "`$STRING`",
          },
          {
            "name": "views",
            "short": "Number of views",
            "type": "`$INTEGER`",
          },
          {
            "name": "width",
            "short": "Image width in pixels",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "image",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "image_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/images/{imageId}",
                "rename": {
                  "param": {
                    "imageId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "images",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "images",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "post_meta": {
        "fields": [
          {
            "name": "count",
            "short": "Number of accolades of this type",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Accolade type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "post_meta",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "RUjYvXN",
                      "kind": "param",
                      "name": "id",
                      "orig": "post_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "post,user,accolades",
                      "kind": "query",
                      "name": "include",
                      "orig": "include",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/post/{postId}/meta",
                "rename": {
                  "param": {
                    "postId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "post",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "meta",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                    "include",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "post",
                  "{id}",
                  "meta",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
