# Imgur SDK utility: make_context

from core.context import ImgurContext


def make_context_util(ctxmap, basectx):
    return ImgurContext(ctxmap, basectx)
