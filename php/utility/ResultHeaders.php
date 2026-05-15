<?php
declare(strict_types=1);

// Imgur SDK utility: result_headers

class ImgurResultHeaders
{
    public static function call(ImgurContext $ctx): ?ImgurResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
