<?php
declare(strict_types=1);

// PostMeta entity test

require_once __DIR__ . '/../imgur_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PostMetaEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ImgurSDK::test(null, null);
        $ent = $testsdk->PostMeta(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = post_meta_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "post_meta." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set IMGUR_TEST_POST_META_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $post_meta_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.post_meta")));
        $post_meta_ref01_data = null;
        if (count($post_meta_ref01_data_raw) > 0) {
            $post_meta_ref01_data = Helpers::to_map($post_meta_ref01_data_raw[0][1]);
        }

        // LIST
        $post_meta_ref01_ent = $client->PostMeta(null);
        $post_meta_ref01_match = [
            "post_id" => $setup["idmap"]["post01"],
        ];

        [$post_meta_ref01_list_result, $err] = $post_meta_ref01_ent->list($post_meta_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($post_meta_ref01_list_result);

    }
}

function post_meta_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/post_meta/PostMetaTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ImgurSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["post_meta01", "post_meta02", "post_meta03", "post01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("IMGUR_TEST_POST_META_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "IMGUR_TEST_POST_META_ENTID" => $idmap,
        "IMGUR_TEST_LIVE" => "FALSE",
        "IMGUR_TEST_EXPLAIN" => "FALSE",
        "IMGUR_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["IMGUR_TEST_POST_META_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["IMGUR_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["IMGUR_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new ImgurSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["IMGUR_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["IMGUR_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
