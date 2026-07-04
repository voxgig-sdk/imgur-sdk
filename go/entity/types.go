// Typed models for the Imgur SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Image is the typed data model for the image entity.
type Image struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Height *int `json:"height,omitempty"`
	Id *string `json:"id,omitempty"`
	Size *int `json:"size,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
	View *int `json:"view,omitempty"`
	Width *int `json:"width,omitempty"`
}

// ImageLoadMatch is the typed request payload for Image.LoadTyped.
type ImageLoadMatch struct {
	Id string `json:"id"`
}

// PostMeta is the typed data model for the post_meta entity.
type PostMeta struct {
	Count *int `json:"count,omitempty"`
	Type *string `json:"type,omitempty"`
}

// PostMetaListMatch is the typed request payload for PostMeta.ListTyped.
type PostMetaListMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
