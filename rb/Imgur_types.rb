# frozen_string_literal: true

# Typed models for the Imgur SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Image entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] views
#   @return [Integer, nil]
#
# @!attribute [rw] width
#   @return [Integer, nil]
Image = Struct.new(
  :created_at,
  :description,
  :height,
  :id,
  :size,
  :title,
  :type,
  :url,
  :views,
  :width,
  keyword_init: true
)

# Request payload for Image#load.
#
# @!attribute [rw] id
#   @return [String]
ImageLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# PostMeta entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
PostMeta = Struct.new(
  :count,
  :type,
  keyword_init: true
)

# Request payload for PostMeta#list.
#
# @!attribute [rw] id
#   @return [String]
PostMetaListMatch = Struct.new(
  :id,
  keyword_init: true
)

