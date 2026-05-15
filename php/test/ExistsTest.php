<?php
declare(strict_types=1);

// Imgur SDK exists test

require_once __DIR__ . '/../imgur_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ImgurSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
