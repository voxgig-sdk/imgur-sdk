<?php
declare(strict_types=1);

// Imgur SDK utility: feature_add

class ImgurFeatureAdd
{
    public static function call(ImgurContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
