package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewImageEntityFunc func(client *ImgurSDK, entopts map[string]any) ImgurEntity

var NewPostMetaEntityFunc func(client *ImgurSDK, entopts map[string]any) ImgurEntity

