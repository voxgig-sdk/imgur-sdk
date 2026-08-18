
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


  main = {
    name: 'Imgur',
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
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "height",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "size",
          "type": "`$INTEGER`"
        },
        {
          "name": "title",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "type": "`$STRING`"
        },
        {
          "name": "views",
          "type": "`$INTEGER`"
        },
        {
          "name": "width",
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
          "type": "`$INTEGER`"
        },
        {
          "name": "type",
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

