<?php
declare(strict_types=1);

// Imgur SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ImgurUtility::setRegistrar(function (ImgurUtility $u): void {
    $u->clean = [ImgurClean::class, 'call'];
    $u->done = [ImgurDone::class, 'call'];
    $u->make_error = [ImgurMakeError::class, 'call'];
    $u->feature_add = [ImgurFeatureAdd::class, 'call'];
    $u->feature_hook = [ImgurFeatureHook::class, 'call'];
    $u->feature_init = [ImgurFeatureInit::class, 'call'];
    $u->fetcher = [ImgurFetcher::class, 'call'];
    $u->make_fetch_def = [ImgurMakeFetchDef::class, 'call'];
    $u->make_context = [ImgurMakeContext::class, 'call'];
    $u->make_options = [ImgurMakeOptions::class, 'call'];
    $u->make_request = [ImgurMakeRequest::class, 'call'];
    $u->make_response = [ImgurMakeResponse::class, 'call'];
    $u->make_result = [ImgurMakeResult::class, 'call'];
    $u->make_point = [ImgurMakePoint::class, 'call'];
    $u->make_spec = [ImgurMakeSpec::class, 'call'];
    $u->make_url = [ImgurMakeUrl::class, 'call'];
    $u->param = [ImgurParam::class, 'call'];
    $u->prepare_auth = [ImgurPrepareAuth::class, 'call'];
    $u->prepare_body = [ImgurPrepareBody::class, 'call'];
    $u->prepare_headers = [ImgurPrepareHeaders::class, 'call'];
    $u->prepare_method = [ImgurPrepareMethod::class, 'call'];
    $u->prepare_params = [ImgurPrepareParams::class, 'call'];
    $u->prepare_path = [ImgurPreparePath::class, 'call'];
    $u->prepare_query = [ImgurPrepareQuery::class, 'call'];
    $u->result_basic = [ImgurResultBasic::class, 'call'];
    $u->result_body = [ImgurResultBody::class, 'call'];
    $u->result_headers = [ImgurResultHeaders::class, 'call'];
    $u->transform_request = [ImgurTransformRequest::class, 'call'];
    $u->transform_response = [ImgurTransformResponse::class, 'call'];
});
