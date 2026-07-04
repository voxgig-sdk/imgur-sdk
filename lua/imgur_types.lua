-- Typed models for the Imgur SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Image
---@field created_at? string
---@field description? string
---@field height? number
---@field id? string
---@field size? number
---@field title? string
---@field type? string
---@field url? string
---@field view? number
---@field width? number

---@class ImageLoadMatch
---@field id string

---@class PostMeta
---@field count? number
---@field type? string

---@class PostMetaListMatch
---@field id string

local M = {}

return M
