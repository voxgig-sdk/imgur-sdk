<?php
declare(strict_types=1);

// Imgur SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ImgurFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ImgurBaseFeature();
            case "test":
                return new ImgurTestFeature();
            default:
                return new ImgurBaseFeature();
        }
    }
}
