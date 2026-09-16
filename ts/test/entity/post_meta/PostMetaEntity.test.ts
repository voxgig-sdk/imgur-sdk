

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ImgurSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('PostMetaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IMGUR_TEST_LIVE=TRUE.
  afterEach(liveDelay('IMGUR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ImgurSDK.test()
    const ent = testsdk.PostMeta()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IMGUR_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'post_meta.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"count","req":false,"short":"Number of accolades of this type","type":"`$INTEGER`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"type","req":false,"short":"Accolade type","type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"post_meta","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"example":"RUjYvXN","kind":"param","name":"id","orig":"post_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":"post,user,accolades","kind":"query","name":"include","orig":"include","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /post/{postId}/meta","json":"{\"operationId\":\"getPostMeta\",\"parameters\":[{\"description\":\"The unique identifier of the post\",\"example\":\"RUjYvXN\",\"in\":\"path\",\"name\":\"postId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated list of metadata to include (e.g., post, user, accolades)\",\"example\":\"post,user,accolades\",\"in\":\"query\",\"name\":\"include\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"accolades\":{\"description\":\"List of accolades for the post\",\"items\":{\"properties\":{\"count\":{\"description\":\"Number of accolades of this type\",\"type\":\"integer\"},\"type\":{\"description\":\"Accolade type\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"post\":{\"description\":\"Post details\",\"properties\":{\"created_at\":{\"description\":\"Post creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Post description\",\"type\":\"string\"},\"downvotes\":{\"description\":\"Number of downvotes\",\"type\":\"integer\"},\"id\":{\"description\":\"Post ID\",\"type\":\"string\"},\"score\":{\"description\":\"Post score\",\"type\":\"integer\"},\"title\":{\"description\":\"Post title\",\"type\":\"string\"},\"upvotes\":{\"description\":\"Number of upvotes\",\"type\":\"integer\"},\"views\":{\"description\":\"Number of views\",\"type\":\"integer\"}},\"type\":\"object\"},\"user\":{\"description\":\"User information\",\"properties\":{\"id\":{\"description\":\"User ID\",\"type\":\"string\"},\"reputation\":{\"description\":\"User reputation score\",\"type\":\"integer\"},\"username\":{\"description\":\"Username\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with post metadata\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Post not found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Post not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Internal server error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/post/{postId}/meta","rename":{"param":{"postId":"id"}},"segments":[{"lit":"post"},{"var":"id"},{"lit":"meta"}],"select":{"exist":["id","include"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"post_meta","name__orig":"post_meta","Name":"PostMeta","name_":"post_meta","name-":"post-meta","NAME":"POST_META","index$":1}, {"active":true,"entity":"post_meta","key$":"BasicPostMetaFlow","kind":"basic","name":"BasicPostMetaFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"post_id":"post01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"post_meta_ref01"}}],"index$":0}]}, 'PostMeta')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let post_meta_ref01_data = Object.values(setup.data.existing.post_meta)[0] as any

    // LIST
    const post_meta_ref01_ent = client.PostMeta()
    const post_meta_ref01_match: any = {}
    post_meta_ref01_match['post_id'] = setup.idmap['post01']

    const post_meta_ref01_list = (await post_meta_ref01_ent.list(post_meta_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/post_meta/PostMetaTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ImgurSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['post_meta01','post_meta02','post_meta03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IMGUR_TEST_POST_META_ENTID': idmap,
    'IMGUR_TEST_LIVE': 'FALSE',
    'IMGUR_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IMGUR_TEST_POST_META_ENTID']

  const live = 'TRUE' === env.IMGUR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IMGUR_TEST_POST_META_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ImgurSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
