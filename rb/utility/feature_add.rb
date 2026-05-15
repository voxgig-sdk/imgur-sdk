# Imgur SDK utility: feature_add
module ImgurUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
