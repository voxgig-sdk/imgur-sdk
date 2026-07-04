# Typed models for the Imgur SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Image:
    created_at: Optional[str] = None
    description: Optional[str] = None
    height: Optional[int] = None
    id: Optional[str] = None
    size: Optional[int] = None
    title: Optional[str] = None
    type: Optional[str] = None
    url: Optional[str] = None
    view: Optional[int] = None
    width: Optional[int] = None


@dataclass
class ImageLoadMatch:
    id: str


@dataclass
class PostMeta:
    count: Optional[int] = None
    type: Optional[str] = None


@dataclass
class PostMetaListMatch:
    id: str

