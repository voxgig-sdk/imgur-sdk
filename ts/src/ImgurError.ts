
import { Context } from './Context'


class ImgurError extends Error {

  isImgurError = true

  sdk = 'Imgur'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ImgurError
}

