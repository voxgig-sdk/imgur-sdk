<?php
declare(strict_types=1);

// Imgur SDK configuration

class ImgurConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Imgur",
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
                "auth" => [
                    "prefix" => "Bearer",
                ],
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
              'active' => true,
              'name' => 'created_at',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'description',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'height',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'size',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'title',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'type',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'url',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'view',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'width',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 9,
            ],
          ],
          'name' => 'image',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'image_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'post_meta' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'count',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'type',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
          ],
          'name' => 'post_meta',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
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
                        'active' => true,
                        'example' => 'post,user,accolades',
                        'kind' => 'query',
                        'name' => 'include',
                        'orig' => 'include',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
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
