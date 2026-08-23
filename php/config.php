<?php
declare(strict_types=1);

// Imgur SDK configuration

class ImgurConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Imgur",
                "slug" => "imgur",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://imgur.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "image" => [],
                    "post_meta" => [],
                ],
            ],
            "entity" => [
        'image' => [
          'fields' => [
            [
              'name' => 'created_at',
              'short' => 'Image upload timestamp',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Image description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'height',
              'short' => 'Image height in pixels',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Image ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'size',
              'short' => 'File size in bytes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'title',
              'short' => 'Image title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'MIME type of the image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'Direct URL to the image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'views',
              'short' => 'Number of views',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'width',
              'short' => 'Image width in pixels',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'image',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'image_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/images/{imageId}',
                  'parts' => [
                    'images',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'imageId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'post_meta' => [
          'fields' => [
            [
              'name' => 'count',
              'short' => 'Number of accolades of this type',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'type',
              'short' => 'Accolade type',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'post_meta',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'RUjYvXN',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'post_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'post,user,accolades',
                        'kind' => 'query',
                        'name' => 'include',
                        'orig' => 'include',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/post/{postId}/meta',
                  'parts' => [
                    'post',
                    '{id}',
                    'meta',
                  ],
                  'rename' => [
                    'param' => [
                      'postId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'include',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ImgurFeatures::make_feature($name);
    }
}
