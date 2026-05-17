package voxgigimgursdk

import (
	"github.com/voxgig-sdk/imgur-sdk/go/core"
	"github.com/voxgig-sdk/imgur-sdk/go/entity"
	"github.com/voxgig-sdk/imgur-sdk/go/feature"
	_ "github.com/voxgig-sdk/imgur-sdk/go/utility"
)

// Type aliases preserve external API.
type ImgurSDK = core.ImgurSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ImgurEntity = core.ImgurEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ImgurError = core.ImgurError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewImageEntityFunc = func(client *core.ImgurSDK, entopts map[string]any) core.ImgurEntity {
		return entity.NewImageEntity(client, entopts)
	}
	core.NewPostMetaEntityFunc = func(client *core.ImgurSDK, entopts map[string]any) core.ImgurEntity {
		return entity.NewPostMetaEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewImgurSDK = core.NewImgurSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
