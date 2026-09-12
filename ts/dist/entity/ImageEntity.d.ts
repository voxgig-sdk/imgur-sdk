import { ImgurEntityBase } from '../ImgurEntityBase';
import type { ImgurSDK } from '../ImgurSDK';
import type { Control } from '../types';
import type { Image, ImageLoadMatch } from '../ImgurTypes';
declare class ImageEntity extends ImgurEntityBase<Image> {
    constructor(client: ImgurSDK, entopts: any);
    make(this: ImageEntity): ImageEntity;
    load(this: any, reqmatch?: ImageLoadMatch, ctrl?: Control): Promise<ImageEntity>;
}
export { ImageEntity };
