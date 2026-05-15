<?php
declare(strict_types=1);

// Imgur SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ImgurMakeContext
{
    public static function call(array $ctxmap, ?ImgurContext $basectx): ImgurContext
    {
        return new ImgurContext($ctxmap, $basectx);
    }
}
