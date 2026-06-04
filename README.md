# Imgur SDK

Find, rate, and share memes and images from the Imgur platform

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Imgur API

[Imgur](https://imgur.com) is a community-driven image and meme sharing site. Its public HTTP API at `https://api.imgur.com` exposes the same image, gallery, and tag data that powers the Imgur website and mobile apps.

What you typically work with through this SDK:

- Image and media metadata served from Imgur's CDN
- Gallery / post discovery and tagging endpoints under `/3/` (for example `GET /3/tags`)
- Client configuration endpoints used by Imgur's own front-ends (for example `GET /3/configuration/desktop`)

Authentication is required: every request must include a registered application's Client ID via an `Authorization: Client-ID <id>` header, and user-scoped actions additionally require an OAuth 2.0 access token. Endpoints, quotas, and availability are defined by Imgur and have historically been unstable for third-party callers, so treat responses defensively.

## Try it

**TypeScript**
```bash
npm install imgur
```

**Python**
```bash
pip install imgur-sdk
```

**PHP**
```bash
composer require voxgig/imgur-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/imgur-sdk/go
```

**Ruby**
```bash
gem install imgur-sdk
```

**Lua**
```bash
luarocks install imgur-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ImgurSDK } from 'imgur'

const client = new ImgurSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o imgur-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "imgur": {
      "command": "/abs/path/to/imgur-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Image** | An image or media item hosted on Imgur, including its CDN URL and associated metadata. | `/images/{imageId}` |
| **PostMeta** | Metadata about a gallery post or tag grouping, such as the tag listings returned by `GET /3/tags`. | `/post/{postId}/meta` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from imgur_sdk import ImgurSDK

client = ImgurSDK({})


# Load a specific image
image, err = client.Image(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'imgur_sdk.php';

$client = new ImgurSDK([]);


// Load a specific image
[$image, $err] = $client->Image(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/imgur-sdk/go"

client := sdk.NewImgurSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Imgur_sdk"

client = ImgurSDK.new({})


# Load a specific image
image, err = client.Image(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("imgur_sdk")

local client = sdk.new({})


-- Load a specific image
local image, err = client:Image(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ImgurSDK.test()
const result = await client.Image().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ImgurSDK.test(None, None)
result, err = client.Image(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ImgurSDK::test(null, null);
[$result, $err] = $client->Image(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Image(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ImgurSDK.test(nil, nil)
result, err = client.Image(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Image(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Imgur API

- Upstream: [https://imgur.com](https://imgur.com)
- API docs: [https://apidocs.imgur.com/](https://apidocs.imgur.com/)

- Use of the API is governed by Imgur's API Terms of Service and Developer Agreement.
- A registered application and Client ID are required; OAuth 2.0 is used for user-authenticated actions.
- Imgur-hosted images and user content remain the property of their respective owners; review Imgur's terms before redistributing content.

---

Generated from the Imgur API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
