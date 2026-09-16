"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ImageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IMGUR_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IMGUR_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ImgurSDK.test();
        const ent = testsdk.Image();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IMGUR_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'image.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "created_at", "req": false, "short": "Image upload timestamp", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "description", "req": false, "short": "Image description", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "height", "req": false, "short": "Image height in pixels", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "id", "req": false, "short": "Image ID", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "size", "req": false, "short": "File size in bytes", "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "title", "req": false, "short": "Image title", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "type", "req": false, "short": "MIME type of the image", "type": "`$STRING`", "index$": 6 }, { "active": true, "format": "uri", "name": "url", "req": false, "short": "Direct URL to the image", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "views", "req": false, "short": "Number of views", "type": "`$INTEGER`", "index$": 8 }, { "active": true, "name": "width", "req": false, "short": "Image width in pixels", "type": "`$INTEGER`", "index$": 9 }], "id": { "field": "id", "name": "id" }, "name": "image", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "image_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /images/{imageId}", "json": "{\"operationId\":\"getImage\",\"parameters\":[{\"description\":\"The unique identifier of the image\",\"in\":\"path\",\"name\":\"imageId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"created_at\":{\"description\":\"Image upload timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Image description\",\"type\":\"string\"},\"height\":{\"description\":\"Image height in pixels\",\"type\":\"integer\"},\"id\":{\"description\":\"Image ID\",\"type\":\"string\"},\"size\":{\"description\":\"File size in bytes\",\"type\":\"integer\"},\"title\":{\"description\":\"Image title\",\"type\":\"string\"},\"type\":{\"description\":\"MIME type of the image\",\"type\":\"string\"},\"url\":{\"description\":\"Direct URL to the image\",\"format\":\"uri\",\"type\":\"string\"},\"views\":{\"description\":\"Number of views\",\"type\":\"integer\"},\"width\":{\"description\":\"Image width in pixels\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with image details\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Image not found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Image not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Internal server error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/images/{imageId}", "rename": { "param": { "imageId": "id" } }, "segments": [{ "lit": "images" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "image", "name__orig": "image", "Name": "Image", "name_": "image", "name-": "image", "NAME": "IMAGE", "index$": 0 }, { "active": true, "entity": "image", "key$": "BasicImageFlow", "kind": "basic", "name": "BasicImageFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "image_ref01", "srcdatavar": "image_ref01_data", "suffix": "_dt0" }, "match": { "id": "image01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-image_ref01" } }], "index$": 0 }] }, 'Image');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let image_ref01_data = Object.values(setup.data.existing.image)[0];
        // LOAD
        const image_ref01_ent = client.Image();
        const image_ref01_match_dt0 = {};
        image_ref01_match_dt0.id = image_ref01_data.id;
        const image_ref01_data_dt0 = (await image_ref01_ent.load(image_ref01_match_dt0)).data();
        (0, node_assert_1.default)(image_ref01_data_dt0.id === image_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/image/ImageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ImgurSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['image01', 'image02', 'image03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IMGUR_TEST_IMAGE_ENTID': idmap,
        'IMGUR_TEST_LIVE': 'FALSE',
        'IMGUR_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['IMGUR_TEST_IMAGE_ENTID'];
    const live = 'TRUE' === env.IMGUR_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IMGUR_TEST_IMAGE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ImgurSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.IMGUR_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ImageEntity.test.js.map