<?php
declare(strict_types=1);

// Imgur SDK utility: result_body

class ImgurResultBody
{
    public static function call(ImgurContext $ctx): ?ImgurResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
