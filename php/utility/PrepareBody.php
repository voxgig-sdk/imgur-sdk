<?php
declare(strict_types=1);

// Imgur SDK utility: prepare_body

class ImgurPrepareBody
{
    public static function call(ImgurContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
