package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Imgur",
			"slug": "imgur",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://imgur.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"image": map[string]any{},
				"post_meta": map[string]any{},
			},
		},
		"entity": map[string]any{
			"image": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"short": "Image upload timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Image description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"short": "Image height in pixels",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Image ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"short": "File size in bytes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "title",
						"short": "Image title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "MIME type of the image",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "Direct URL to the image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "views",
						"short": "Number of views",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "width",
						"short": "Image width in pixels",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "image",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "image_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/images/{imageId}",
								"rename": map[string]any{
									"param": map[string]any{
										"imageId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "images",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"images",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"post_meta": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"short": "Number of accolades of this type",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Accolade type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "post_meta",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "RUjYvXN",
											"kind": "param",
											"name": "id",
											"orig": "post_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "post,user,accolades",
											"kind": "query",
											"name": "include",
											"orig": "include",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/post/{postId}/meta",
								"rename": map[string]any{
									"param": map[string]any{
										"postId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "post",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "meta",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"include",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"post",
									"{id}",
									"meta",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
