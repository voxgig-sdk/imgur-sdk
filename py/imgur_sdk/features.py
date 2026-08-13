# Imgur SDK feature factory

from imgur_sdk.feature.base_feature import ImgurBaseFeature
from imgur_sdk.feature.test_feature import ImgurTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ImgurBaseFeature(),
        "test": lambda: ImgurTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
