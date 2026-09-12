
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Imgur',
        slug: "imgur",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://imgur.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      image: {
      },

      post_meta: {
      },

    }
  }


  entity = {
    "image": {
      "fields": [
        {
          "format": "date-time",
          "name": "created_at",
          "short": "Image upload timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Image description",
          "type": "`$STRING`"
        },
        {
          "name": "height",
          "short": "Image height in pixels",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "short": "Image ID",
          "type": "`$STRING`"
        },
        {
          "name": "size",
          "short": "File size in bytes",
          "type": "`$INTEGER`"
        },
        {
          "name": "title",
          "short": "Image title",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "short": "MIME type of the image",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "url",
          "short": "Direct URL to the image",
          "type": "`$STRING`"
        },
        {
          "name": "views",
          "short": "Number of views",
          "type": "`$INTEGER`"
        },
        {
          "name": "width",
          "short": "Image width in pixels",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/images/{imageId}",
              "rename": {
                "param": {
                  "imageId": "id"
                }
              },
              "segments": [
                {
                  "lit": "images"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "images",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "post_meta": {
      "fields": [
        {
          "name": "count",
          "short": "Number of accolades of this type",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "short": "Accolade type",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "post,user,accolades",
                    "kind": "query",
                    "name": "include",
                    "orig": "include",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/post/{postId}/meta",
              "rename": {
                "param": {
                  "postId": "id"
                }
              },
              "segments": [
                {
                  "lit": "post"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "meta"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "include"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "post",
                "{id}",
                "meta"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

