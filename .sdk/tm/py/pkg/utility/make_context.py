# Imgur SDK utility: make_context

from projectname_sdk.core.context import ImgurContext


def make_context_util(ctxmap, basectx):
    return ImgurContext(ctxmap, basectx)
