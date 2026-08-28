// Typed models for the Imgur SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Image {
  created_at?: string
  description?: string
  height?: number
  id?: string
  size?: number
  title?: string
  type?: string
  url?: string
  views?: number
  width?: number
}

export interface ImageLoadMatch {
  id: string
}

export interface PostMeta {
  count?: number
  id?: string
  type?: string
}

export interface PostMetaListMatch {
  id: string
  include?: string
}

