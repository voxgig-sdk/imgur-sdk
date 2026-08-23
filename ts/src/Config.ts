
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
      }
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
              "parts": [
                "images",
                "{id}"
              ],
              "rename": {
                "param": {
                  "imageId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "name": "type",
          "short": "Accolade type",
          "type": "`$STRING`"
        }
      ],
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
              "parts": [
                "post",
                "{id}",
                "meta"
              ],
              "rename": {
                "param": {
                  "postId": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "include"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

