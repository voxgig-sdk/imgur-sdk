import { ImgurEntityBase } from '../ImgurEntityBase';
import type { ImgurSDK } from '../ImgurSDK';
import type { Control } from '../types';
import type { PostMeta, PostMetaListMatch } from '../ImgurTypes';
declare class PostMetaEntity extends ImgurEntityBase<PostMeta> {
    constructor(client: ImgurSDK, entopts: any);
    make(this: PostMetaEntity): PostMetaEntity;
    list(this: any, reqmatch?: PostMetaListMatch, ctrl?: Control): Promise<PostMetaEntity[]>;
}
export { PostMetaEntity };
