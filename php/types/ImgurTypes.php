<?php
declare(strict_types=1);

// Typed models for the Imgur SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Image entity data model. */
class Image
{
    public ?string $created_at = null;
    public ?string $description = null;
    public ?int $height = null;
    public ?string $id = null;
    public ?int $size = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $url = null;
    public ?int $views = null;
    public ?int $width = null;
}

/** Request payload for Image#load. */
class ImageLoadMatch
{
    public string $id;
}

/** PostMeta entity data model. */
class PostMeta
{
    public ?int $count = null;
    public ?string $id = null;
    public ?string $type = null;
}

/** Request payload for PostMeta#list. */
class PostMetaListMatch
{
    public string $id;
}

