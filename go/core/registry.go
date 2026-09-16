package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewImageEntityFunc func(client *ImgurSDK, entopts map[string]any) ImgurEntity

var NewPostMetaEntityFunc func(client *ImgurSDK, entopts map[string]any) ImgurEntity

