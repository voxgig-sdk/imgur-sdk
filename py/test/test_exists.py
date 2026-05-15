# ProjectName SDK exists test

import pytest
from imgur_sdk import ImgurSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ImgurSDK.test(None, None)
        assert testsdk is not None
