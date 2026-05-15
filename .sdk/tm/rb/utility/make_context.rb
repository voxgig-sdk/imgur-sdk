# Imgur SDK utility: make_context
require_relative '../core/context'
module ImgurUtilities
  MakeContext = ->(ctxmap, basectx) {
    ImgurContext.new(ctxmap, basectx)
  }
end
