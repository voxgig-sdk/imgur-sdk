# Typed models for the Imgur SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Image(TypedDict, total=False):
    created_at: str
    description: str
    height: int
    id: str
    size: int
    title: str
    type: str
    url: str
    views: int
    width: int


class ImageLoadMatch(TypedDict):
    id: str


class PostMeta(TypedDict, total=False):
    count: int
    id: str
    type: str


class PostMetaListMatchRequired(TypedDict):
    id: str


class PostMetaListMatch(PostMetaListMatchRequired, total=False):
    include: str
